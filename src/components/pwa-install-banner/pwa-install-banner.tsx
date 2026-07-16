import { useEffect, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { trackEvent } from '@/lib/analytics/analytics';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const DISMISSED_KEY = 'goeat:pwa-install-banner-dismissed';

const isRunningStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as Navigator & { standalone?: boolean }).standalone ===
    true;

export function PwaInstallBanner() {
  const [installPrompt, setInstallPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showIosInstructions, setShowIosInstructions] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (Platform.OS !== 'web' || isRunningStandalone()) {
      return;
    }

    const wasDismissed = window.localStorage.getItem(DISMISSED_KEY) === 'true';
    setDismissed(wasDismissed);

    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIos = /iphone|ipad|ipod/.test(userAgent);
    const isSafari =
      /safari/.test(userAgent) && !/crios|fxios|edgios/.test(userAgent);

    setShowIosInstructions(isIos && isSafari);

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    const handleInstalled = () => {
      setInstallPrompt(null);
      setShowIosInstructions(false);
      void trackEvent('pwa_install');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  if (
    Platform.OS !== 'web' ||
    dismissed ||
    (!installPrompt && !showIosInstructions)
  ) {
    return null;
  }

  const dismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY, 'true');
    setDismissed(true);
  };

  const install = async () => {
    if (!installPrompt) {
      return;
    }

    void trackEvent('pwa_install_prompt');
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    void trackEvent('pwa_install_choice', { outcome: choice.outcome });
    setInstallPrompt(null);
  };

  return (
    <View
      className="absolute left-4 right-4 top-4 z-[9998] rounded-2xl border border-[#FFD7C8] bg-white p-4 shadow-lg"
      accessibilityRole="alert"
    >
      <View className="flex-row items-start">
        <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-[#FFF0EB]">
          <Ionicons name="download-outline" size={24} color="#FF7947" />
        </View>

        <View className="flex-1 pr-2">
          <Text className="font-semibold text-base text-[#252525]">
            Instale o GoEat
          </Text>
          <Text className="mt-1 text-sm leading-5 text-[#5F5F5F]">
            {showIosInstructions
              ? 'Toque em Compartilhar e depois em Adicionar à Tela de Início.'
              : 'Acesse suas recomendações mais rápido, direto da tela inicial.'}
          </Text>

          {installPrompt ? (
            <Pressable
              className="mt-3 self-start rounded-full bg-[#FF7947] px-5 py-2"
              onPress={() => void install()}
              accessibilityRole="button"
              accessibilityLabel="Instalar o GoEat"
            >
              <Text className="font-semibold text-sm text-white">Instalar</Text>
            </Pressable>
          ) : null}
        </View>

        <Pressable
          className="p-1"
          onPress={dismiss}
          accessibilityRole="button"
          accessibilityLabel="Fechar aviso de instalação"
        >
          <Ionicons name="close" size={22} color="#5F5F5F" />
        </Pressable>
      </View>
    </View>
  );
}
