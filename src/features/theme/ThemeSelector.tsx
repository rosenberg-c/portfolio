import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type ThemePreference } from "./useTheme";
import styles from "./theme.module.css";

const ICONS = { dark: Moon, light: Sun, system: Monitor } as const;

const OPTIONS: ReadonlyArray<{ value: ThemePreference; label: string }> = [
  { value: "dark", label: "Dark" },
  { value: "light", label: "Light" },
  { value: "system", label: "System" },
];

export const ThemeSelector = ({ id = "theme-preference" }: { id?: string }) => {
  const { preference, setPreference } = useTheme();
  const Icon = ICONS[preference];

  return (
    <label className={styles["theme-selector"]} htmlFor={id}>
      <Icon
        className={styles["theme-selector__icon"]}
        size={18}
        aria-hidden="true"
      />
      <select
        id={id}
        aria-label="Theme"
        className={styles["theme-selector__control"]}
        value={preference}
        onChange={(event) =>
          setPreference(event.target.value as ThemePreference)
        }
      >
        {OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};
