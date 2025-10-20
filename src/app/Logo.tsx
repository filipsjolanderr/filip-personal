import * as stylex from "@stylexjs/stylex";
import Image from "next/image";

type Props = {
  style?: stylex.StyleXStyles;
  src: string;
};

export default function Logo({ style, src }: Props) {
  return (
    <div {...stylex.props(styles.container, style)}>
      <Image
        priority
        src={src}
        alt="Filip Sjölander"
        width={465}
        height={62}
        {...stylex.props(styles.logoImage)}
      />
    </div>
  );
}

const styles = stylex.create({
  container: {
    alignItems: "center",
    display: "flex",
    height: "50vh",
    justifyContent: "center",
    // eslint-disable-next-line @stylexjs/valid-styles
    viewTransitionName: "logo",
    width: "auto",
  },
  logoImage: {
    height: "100%",
    objectFit: "contain",
    width: "100%",
  },
});
