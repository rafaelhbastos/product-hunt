interface TabsProps<T> {
  tabs: {
    label: string;
    value: T;
  }[];
  selected: T;
  onChange: (value: T) => void;
}

export const Tabs = <T,>({ tabs, selected, onChange }: TabsProps<T>) => {
  return (
    <div className="tabs h-full">
      {tabs.map((tab) => {
        const isActiveClass = selected === tab.value ? "active" : "";
        return (
          <div
            key={String(tab.value)}
            className={`tab ${isActiveClass}`}
            onClick={() => onChange(tab.value)}
          >
            {tab.label}
          </div>
        );
      })}
    </div>
  );
};
