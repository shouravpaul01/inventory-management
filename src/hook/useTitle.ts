import React, { useEffect } from "react";

const useTitle = (title: string) => {
  useEffect(() => {
    document.title=title?`${title} | JU-Inventory Management`:"JU-Inventory Management"
  }, []);
};

export default useTitle;
