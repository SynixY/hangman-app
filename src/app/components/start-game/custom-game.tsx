import React from "react";

const settingsConfig = [
  {
    type: "select",
    name: "speed",
    title: "Time",
    description: "Time per turn",
    icon: "/images/ic_time.svg",
    defaultValue: "2",
    options: [
      { value: "3", label: "Fast" },
      { value: "2", label: "Normal" },
    ],
  },
  {
    type: "select",
    name: "turns",
    title: "Turns",
    description: "How many turns in total",
    icon: "/images/ic_turn.svg",
    defaultValue: "3",
    options: [
      { value: "3", label: "3" },
      { value: "2", label: "2" },
    ],
  },
  {
    type: "switch",
    name: "score",
    title: "Hidden Word",
    description: "Hide the word per turn",
    icon: "/images/ic_visibility.svg",
  },
];

// A single setting item component for reusability
const SettingItem = ({
  title,
  description,
  children,
  icon,
}: {
  title: string;
  description: string;
  children: any;
  icon: string;
}) => (
  <div className="jsx-628a948545b7976b jsx-4158124863 label">
    <div className="jsx-628a948545b7976b jsx-4158124863 legend">
      <i
        className="jsx-628a948545b7976b jsx-4158124863"
        style={{
          backgroundImage: `url(${icon})`,
        }}
      ></i>
      <span className="jsx-628a948545b7976b jsx-4158124863">
        <h5 className="jsx-628a948545b7976b jsx-4158124863">{title}</h5>
        <p className="jsx-628a948545b7976b jsx-4158124863">{description}</p>
      </span>
    </div>
    <section className="jsx-628a948545b7976b jsx-4158124863">
      {children}
    </section>
  </div>
);

// Switch component for ON/OFF toggles
const Switch = ({ name }: { name: string }) => (
  <div className="jsx-fdbd135fae71230c switch">
    <input
      type="radio"
      id={`${name}_0`}
      name={name}
      className="jsx-fdbd135fae71230c"
      value="2"
      defaultChecked
    />
    <label htmlFor={`${name}_0`} className="jsx-fdbd135fae71230c">
      OFF
    </label>
    <input
      type="radio"
      id={`${name}_1`}
      name={name}
      className="jsx-fdbd135fae71230c"
      value="1"
    />
    <label htmlFor={`${name}_1`} className="jsx-fdbd135fae71230c">
      ON
    </label>
  </div>
);

export default function CustomGame() {
  // NOTE: The logic for these inputs is not yet implemented.
  return (
    // The scroll classes are now on the parent container to fix scrolling
    <div className="jsx-ff9a91141b223811 config scroll over top">
      <div
        className="jsx-2980934243 scrollElements"
        style={{ overflow: "auto" }}
      >
        <div className="jsx-ff9a91141b223811 listconf">
          {/* Map over the config array to dynamically render settings */}
          {settingsConfig.map((setting, index) => (
            <SettingItem
              key={index}
              title={setting.title}
              description={setting.description}
              icon={setting.icon}
            >
              {setting.type === "select" && (
                <label className="jsx-833d62ffcae7f9f select">
                  <select
                    name={setting.name}
                    className="jsx-833d62ffcae7f9f"
                    defaultValue={setting.defaultValue}
                  >
                    {setting.options?.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="jsx-833d62ffcae7f9f"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {setting.type === "switch" && <Switch name={setting.name} />}
            </SettingItem>
          ))}

          <hr className="jsx-ff9a91141b223811" />

          <div className="jsx-ff9a91141b223811 estimatedTime">
            <span className="jsx-ff9a91141b223811">
              <p className="jsx-ff9a91141b223811">DURATA STIMATA: 1 MINUTO</p>
            </span>
          </div>

          <div className="jsx-ff9a91141b223811 copy">
            <span className="jsx-ff9a91141b223811">
              <h5 className="jsx-ff9a91141b223811">
                IMPOSTAZIONI PARTITA
                <i className="jsx-ff9a91141b223811">
                  <span className="jsx-3e55f1c85815f7f6 tooltip">
                    Copia impostazioni della stanza per riutilizzarle in seguito
                  </span>
                </i>
              </h5>
              <button
                type="button"
                className="jsx-1e5748a2310b0bd small"
                onClick={() => {}}
              >
                <i className="jsx-bf1d798ec2f16818 config"></i>
                <strong className="jsx-ff9a91141b223811">COPIA</strong>
              </button>
            </span>
            <span className="jsx-ff9a91141b223811">
              <h5 className="jsx-ff9a91141b223811">
                INVITO INDIVIDUALE
                <i className="jsx-ff9a91141b223811">
                  <span className="jsx-3e55f1c85815f7f6 tooltip">
                    Ogni invito è utilizzabile una sola volta
                  </span>
                </i>
              </h5>
              <button
                type="button"
                className="jsx-1e5748a2310b0bd small"
                onClick={() => {}}
              >
                <i className="jsx-bf1d798ec2f16818 invite"></i>
                <strong className="jsx-ff9a91141b223811">CREA</strong>
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="jsx-2980934243 scrollBar">
        <div
          className="jsx-2980934243 scrollTrack"
          style={{ top: "4px", height: "30px" }}
        ></div>
      </div>
    </div>
  );
}
