import React from "react";

type Props = {};

const Welcome = (props: Props) => {
  return (
    <div className="px-4 pt-20 text-center">
      <h1 className="text-4xl font-extrabold tracking-normal">Name</h1>
      <p className="mx-auto mt-4 max-w-3xl text-base">Description</p>
    </div>
  );
};

export default Welcome;
