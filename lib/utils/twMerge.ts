export function twMerge(...classes: (string | undefined | false | null)[]) {
  return classes.filter(Boolean).join(" ");
}
