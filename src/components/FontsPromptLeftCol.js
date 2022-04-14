export default function FontsPromptLeftCol(props) {
  return (
    <div className="grid grid-template-rows-2 px-4 py-4">
      <div>
        <h2 className="text-2xl lg:text-4xl pb-5"> Choose a font that feels</h2>
        <h1 className="text-5xl lg:text-8xl inline-block border-solid border-2 border-black rounded-full px-8 py-3">
          {props.keyword}
        </h1>
      </div>
      <h3 className="text-2xl lg:text-4xl flex justify-self-start items-end h-full">
        Q{props.qCount + 1}/20
      </h3>
    </div>
  );
}
