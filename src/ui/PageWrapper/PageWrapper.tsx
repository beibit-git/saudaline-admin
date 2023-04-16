interface PageWrapperProps {
  children?: React.ReactNode;
  width?: number | string;
  center?: boolean;
  style?: React.CSSProperties;
}
const PageWrapper = ({ children, width, center, style }: PageWrapperProps) => {
  const defaultStyles = { padding: 24, width: width ?? '100%', margin: center ? '0 auto' : 'none' };
  const styles = { ...defaultStyles, ...style };
  return (
    <div className="site-layout-background" style={styles}>
      {children}
    </div>
  );
};
export default PageWrapper;
