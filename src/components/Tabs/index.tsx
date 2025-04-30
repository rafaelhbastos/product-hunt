import classNames from "classnames";

interface TabsProps<T> {
  tabs: {
    label: string;
    value: T;
  }[];
  selected: T;
  onChange: (value: T) => void;
  className?: string;
  btnClassName?: string;
}

export const Tabs = <T,>({
  tabs,
  selected,
  onChange,
  className,
  btnClassName,
}: TabsProps<T>) => {
  return (
    <div className={classNames("tabs h-full", className)}>
      {tabs.map((tab) => {
        return (
          <button
            key={String(tab.value)}
            className={classNames(
              "tab",
              { active: selected === tab.value },
              btnClassName
            )}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};
