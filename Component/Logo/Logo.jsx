import s from "./style.module.css";
export function Logo({ title, subtitle, image }) {
  return (
    <div>
      <div className="container">
        {" "}
        <img className={s.img} src={image} alt="logo" />
        <div className={s.title}>{title}</div>
      </div>
      <div className={s.subtitle}>{subtitle}</div>
    </div>
  );
}
