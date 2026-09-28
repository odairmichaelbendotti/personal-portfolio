const ContentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:-ml-7.5 w-full md:w-200 border-r border-t border-b border-default-border h-full md:h-panel">
      {children}
    </div>
  );
};

export default ContentLayout;
