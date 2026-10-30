import { Fragment } from "react";

/** Dictionary strings: "\n" is a line break, "*word*" is the blue accent. */
export default function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line.split(/\*([^*]+)\*/).map((part, k) =>
            k % 2 ? (
              <span key={k} className="text-blue">
                {part}
              </span>
            ) : (
              part
            ),
          )}
        </Fragment>
      ))}
    </>
  );
}
