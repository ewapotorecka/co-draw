import React, { ReactElement, useEffect } from "react";

const PageTitle: ({ title, children }: PageProps) => ReactElement | null = ({
  title,
  children,
}: PageProps) => {
  useEffect(() => {
    document.title = title || "";
  }, [title]);

  return children;
};

interface PageProps {
  title: string;
  children: React.ReactElement | null;
}

export default PageTitle;
