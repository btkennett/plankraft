import type { BomItem } from "@/lib/plan/types";

interface Props {
  items: BomItem[];
  total: number;
}

export default function Bom({ items, total }: Props) {
  return (
    <div className="s5-second-cell">
      <div className="s5-second-h">Bill of materials</div>
      {items.map((item) => (
        <div key={item.label} className="s5-cost-row">
          <span className="l">{item.label}</span>
          <span className="v">${item.price}</span>
        </div>
      ))}
      <div className="s5-cost-row total">
        <span className="l">Total · est.</span>
        <span className="v">${total}</span>
      </div>
    </div>
  );
}
