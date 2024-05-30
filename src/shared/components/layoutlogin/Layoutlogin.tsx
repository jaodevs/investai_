import "./styles.css";
interface LayoutComponentsProps {
  children: React.ReactNode;
}

export const LayoutComponents = ({ children }: LayoutComponentsProps) => {
  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">{children}</div>
      </div>
    </div>
  );
};
