import { useQueryData } from "@/app/store/query-data.store";
import { useTheme } from "@/app/store/theme.store";
import { themeColors } from "@/app/theme/themeColors";
import Image from "next/image";
import { Avatar } from "./ui/Avatar";
import Text from "./ui/Text";

const UtilityMiniInfo = () => {
  const { activeTheme } = useTheme();
  const theme = themeColors[activeTheme];
  const { utilityData } = useQueryData((state) => state);

  return (
    <div>
      {utilityData ? (
        <div className="flex flex-col pt-4">
          <div
            className="p-2  size-24 m-auto  rounded-full border-2 text-center overflow-hidden flex items-center justify-center"
            style={{
              background: theme.background.overlayBg,
              borderColor: theme.border.quaternary,
            }}
          >
            {utilityData?.utility?.logo ? (
              <Image
                src={utilityData?.utility?.logo}
                alt={utilityData?.utility?.name}
                width={120}
                height={120}
                className="object-contain  w-20 h-20"
                priority
              />
            ) : (
              <Avatar name={utilityData?.utility?.name} />
            )}
          </div>
          <div className="pt-4">
            <Text className="text-xl font-bold text-center ">
              {utilityData?.utility?.name}
            </Text>
            <Text className="text-md font-medium mt-1 mb-2 text-center opacity-80">
              {utilityData?.utility?.description}
            </Text>{" "}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UtilityMiniInfo;
