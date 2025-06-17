import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = {
  type: string;
};
const Loading = ({ type }: Props) => {
  const themeProps = {
    baseColor: type === "sidebar" ? "#2c2a2a" : "#202020",
    highlightColor: "#444",
  };

  const skeletonProps = {
    count: type === "sidebar" ? 4 : 1,
    height: type === "sidebar" ? 60 : 100,
  };
  return (
    <div className=" flex flex-col">
      <SkeletonTheme {...themeProps}>
        <Skeleton
          {...skeletonProps}
          className={`${type === "sidebar" ? "mb-1" : ""}`}
        />
      </SkeletonTheme>
    </div>
  );
};

export default Loading;
