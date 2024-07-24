import React from "react";
import BlogStandard from "@/src/components/blog/BlogStandard";
import Breadcrumb from "@/src/components/breadcrumb/Breadcrumb";
function BlogStandardPage() {
  return (
    <>
      <Breadcrumb pageName="Blog Standard" pageTitle="Blog Standard" />
      <BlogStandard />
    </>
  );
}

export default BlogStandardPage;
