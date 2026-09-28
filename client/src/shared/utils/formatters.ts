export const cls = (...classes: (string | undefined | false)[]) => {
  return classes.filter(Boolean).join(" ");
};
