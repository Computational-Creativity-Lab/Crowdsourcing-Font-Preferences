export default function FontsPromptLeftCol(props) {
  return (
    <div className="grid grid-template-rows-2 px-4 py-4">
      <div>
        <h2 className="pb-5"> Choose a font that feels</h2>
        <h1 className="inline-block border-solid border-2 border-black rounded-full px-8 py-3">
          {props.keyword}
        </h1>
      </div>
      <h3 className="flex justify-self-start items-end h-full">
        Q{props.qCount}/10
      </h3>
    </div>
  );
}
