const DiagramCombineWidget = () => {
  return (
    <div className="flex flex-col flex-grow border-[solid] border-[1px] border-[black] bg-[lightgray]">
      <div className="flex flex-col items-center justify-center flex-grow border-[solid] border-[1px] border-[black] min-h-[50px]">
        Total
      </div>
      <div className="flex flex-row flex-grow min-h-[50px]">
        <div className="flex flex-col flex-grow items-center justify-center border-[solid] border-[1px] border-[black]">
          Part
        </div>
        <div className="flex flex-col flex-grow items-center justify-center border-[solid] border-[1px] border-[black]">
          Part
        </div>
      </div>
    </div>
  );
};

export default DiagramCombineWidget;
