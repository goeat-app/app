export const ERROR_MESSAGES: Record<string, string> = {
  'User already exists': 'Usuário já existe. Tente fazer login.',
  'Network Error': 'Erro de conexão. Verifique sua internet e tente novamente.',
  'Invalid credentials': 'Email ou senha incorretos.',
  'User not found': 'Usuário não encontrado.',
  'Too many attempts':
    'Muitas tentativas de login. Tente novamente em alguns minutos.',
};

export const getErrorByStatusCode = (status?: number): string => {
  switch (status) {
    case 409:
      return 'User already exists';
    case 400:
      return 'Dados inválidos. Verifique as informações e tente novamente.';
    case 500:
      return 'Erro no servidor. Tente novamente mais tarde.';
    case 503:
      return 'Serviço temporariamente indisponível. Tente novamente em alguns minutos.';
    default:
      return 'Erro ao cadastrar usuário. Tente novamente.';
  }
};
