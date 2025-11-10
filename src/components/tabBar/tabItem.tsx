import { Animated, TouchableOpacity } from "react-native";
import { Typography } from "../typography/typography";

type TabItemProps = {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
}

export const TabItem = ({ icon, label, onPress }: TabItemProps) => {
    return (
       <TouchableOpacity onPress={onPress} className="flex-1 flex-col items-center justify-center p-2">
            {icon}
            <Typography type="body" className="text-white font-poppins-medium text-xs" text={label} />
        </TouchableOpacity>
  
    )
}