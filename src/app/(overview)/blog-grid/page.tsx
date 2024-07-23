import React from "react";
import BlogGrid from "@/src/components/blog/BlogGrid";
import Breadcrumb from "@/src/components/breadcrumb/Breadcrumb";
function blogGridPage() {
  return (
    <>
      <Breadcrumb pageName="Blog Grid" pageTitle="Blog Grid" />
      <BlogGrid />
    </>
  );
}

export default blogGridPage;
