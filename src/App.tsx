import { useEffect, useState } from "react";
import "./App.css";
import {
  Excalidraw,
  convertToExcalidrawElements,
} from "@excalidraw/excalidraw";
import { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types/types";
import {
  ExcalidrawElement,
  StrokeRoundness,
} from "@excalidraw/excalidraw/types/element/types";

function App() {
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [length, setLength] = useState<string>("");

  const drawSquare = () => {
    excalidrawAPI?.updateScene({
      elements: convertToExcalidrawElements([
        {
          type: "line",
          x: 200,
          strokeColor: "#000",
          width: 500,
          y: 200,
          strokeStyle: "solid",
          strokeWidth: 1,
          roughness: 0,
        },
        {
          type: "text",
          x: 450,
          y: 175,
          text: "500",
          fontSize: 20,
          textAlign: "center",
        },
        {
          type: "line",
          x: 200,
          strokeColor: "#000",
          width: 500,
          y: 500,
          strokeStyle: "solid",
          strokeWidth: 1,
          roughness: 0,
        },
        {
          type: "text",
          x: 200,
          y: 340,
          text: "300",
          fontSize: 20,
          textAlign: "center",
        },
        {
          type: "line",
          x: 200,
          strokeColor: "#000",
          width: 1,
          height: 300,
          y: 200,
          strokeStyle: "solid",
          strokeWidth: 1,
          roughness: 0,
        },
        {
          type: "text",
          x: 450,
          y: 500,
          text: "500",
          fontSize: 20,
          textAlign: "center",
        },
        {
          type: "line",
          x: 700,
          strokeColor: "#000",
          width: 1,
          height: 300,
          y: 200,
          strokeStyle: "solid",
          strokeWidth: 1,
          roughness: 0,
        },
        {
          type: "text",
          x: 700,
          y: 340,
          text: "300",
          fontSize: 20,
          textAlign: "center",
        },
      ]),
    });
  };

  const drawLineWithWidthLabelOnCenterOfLine = () => {
    excalidrawAPI?.updateScene({
      elements: convertToExcalidrawElements([
        {
          type: "line",
          x: 200,
          strokeColor: "#000",
          width: 500,
          y: 200,
          strokeStyle: "solid",
          strokeWidth: 1,
          roughness: 0,
          groupIds: ["1"],
        },
        {
          type: "text",
          x: 450,
          y: 175,
          text: covertPxToMm(500).toString(),
          fontSize: 20,
          textAlign: "center",
          groupIds: ["1"],
        },
      ]),
    });
  };

  const covertPxToMm = (px: number) => {
    return parseFloat((px * 0.264583).toFixed(2));
  };

  const onchangeElements = (elements: ExcalidrawElement[]) => {
    setElements(elements);
  };

  // const handlePointerUp = useCallback(() => {
  //   if (!elements?.length) return;
  //   const updatedElements = [...elements];
  //   const lineElement = elements
  //     ?.reverse()
  //     .find((element) => element.type === "line");
  //   const lineTextElement = elements?.find(
  //     (element) =>
  //       element.type === "text" &&
  //       lineElement?.id &&
  //       element.groupIds?.includes(lineElement?.id)
  //   );
  //   if (lineElement && lineTextElement) {
  //     // update line text
  //     const text = `${covertPxToMm(lineElement?.width)}`;
  //     const updatedLineTextElement = {
  //       ...lineTextElement,
  //       text,
  //     };
  //     const index = updatedElements.findIndex(
  //       (element) => element.id === lineTextElement.id
  //     );
  //     updatedElements.splice(index, 1);
  //     // add new text element
  //     updatedElements.push(updatedLineTextElement);
  //     excalidrawAPI?.updateScene({
  //       elements: updatedElements,
  //     });
  //     return;
  //   }
  //   if (lineElement && !lineTextElement) {
  //     const textElement = elements
  //       ?.reverse()
  //       .find(
  //         (element) =>
  //           element.type === "text" &&
  //           element.groupIds?.includes(lineElement.groupIds?.[0])
  //       );
  //     if (textElement) {
  //     } else {
  //       const newTextElement = {
  //         type: "text",
  //         x: lineElement.x + lineElement.width / 2,
  //         y: lineElement.y - 25,
  //         text: `${covertPxToMm(lineElement?.width)}`,
  //         fontSize: 20,
  //         textAlign: "center",
  //         fontFamily: "Arial",
  //         groupIds: [lineElement?.id],
  //       };
  //       const excalidrawTextElements = convertToExcalidrawElements([
  //         newTextElement as any,
  //       ]);
  //       updatedElements.push(excalidrawTextElements?.[0]);
  //     }
  //     excalidrawAPI?.updateScene({
  //       elements: updatedElements,
  //     });
  //     return;
  //   }
  // }, [elements]);

  useEffect(() => {
    if (!excalidrawAPI) return;
    // excalidrawAPI.onPointerUp(() => {
    //   handlePointerUp();
    // });
    const updatedAppState = {
      currentItemRoughness: 0,
      currentItemStrokeWidth: 1,
      currentItemRoundness: "sharp" as StrokeRoundness,
    };
    excalidrawAPI.updateScene({
      appState: updatedAppState,
    });
  }, [excalidrawAPI, elements]);

  const handleLeftClick = () => {
    const wallElement: any = elements.find((element) => element.id === "wall");
    if (wallElement) {
      const unit = parseInt(length);
      const lastPoint = wallElement?.points[wallElement?.points.length - 1];
      const updatedWallElement = {
        ...wallElement,
        points: [...wallElement?.points, [lastPoint[0] - unit, lastPoint[1]]],
      };
      const updatedElements = elements.map((element) => {
        if (element.id === "wall") {
          return updatedWallElement;
        }
        return element;
      });
      excalidrawAPI?.updateScene({
        elements: updatedElements,
      });
    } else {
      const lineElement = {
        id: "wall",
        type: "line",
        x: 200,
        strokeColor: "#000",
        width: parseInt(length),
        y: 200,
        strokeStyle: "solid",
        strokeWidth: 1,
        roughness: 0,
      };
      excalidrawAPI?.updateScene({
        elements: convertToExcalidrawElements([lineElement] as any, {
          regenerateIds: false,
        }),
      });
    }
    setLength("");
  };

  const handleDownClick = () => {
    const wallElement: any = elements.find((element) => element.id === "wall");
    if (wallElement) {
      const unit = parseInt(length);
      const lastPoint = wallElement?.points[wallElement?.points.length - 1];
      const updatedWallElement = {
        ...wallElement,
        points: [...wallElement?.points, [lastPoint[0], lastPoint[1] + unit]],
      };
      const updatedElements = elements.map((element) => {
        if (element.id === "wall") {
          return updatedWallElement;
        }
        return element;
      });
      excalidrawAPI?.updateScene({
        elements: updatedElements,
      });
    } else {
      const lineElement = {
        id: "wall",
        type: "line",
        x: 200,
        strokeColor: "#000",
        y: 200,
        strokeStyle: "solid",
        strokeWidth: 1,
        roughness: 0,
        points: [
          [0, 0],
          [0, parseInt(length)],
        ],
      };
      excalidrawAPI?.updateScene({
        elements: convertToExcalidrawElements([lineElement] as any, {
          regenerateIds: false,
        }),
      });
    }
    setLength("");
  };

  const handleRightClick = () => {
    const wallElement: any = elements.find((element) => element.id === "wall");
    if (wallElement) {
      const unit = parseInt(length);
      const lastPoint = wallElement?.points[wallElement?.points.length - 1];
      const updatedWallElement = {
        ...wallElement,
        points: [...wallElement?.points, [lastPoint[0] + unit, lastPoint[1]]],
      };
      const updatedElements = elements.map((element) => {
        if (element.id === "wall") {
          return updatedWallElement;
        }
        return element;
      });
      excalidrawAPI?.updateScene({
        elements: updatedElements,
      });
    } else {
      const lineElement = {
        id: "wall",
        type: "line",
        x: 200,
        strokeColor: "#000",
        width: parseInt(length),
        y: 200,
        strokeStyle: "solid",
        strokeWidth: 1,
        roughness: 0,
      };
      excalidrawAPI?.updateScene({
        elements: convertToExcalidrawElements([lineElement] as any, {
          regenerateIds: false,
        }),
      });
    }
    setLength("");
  };

  const handleUpClick = () => {
    const wallElement: any = elements.find((element) => element.id === "wall");
    if (wallElement) {
      const unit = parseInt(length);
      const lastPoint = wallElement?.points[wallElement?.points.length - 1];
      const updatedWallElement = {
        ...wallElement,
        points: [...wallElement?.points, [lastPoint[0], lastPoint[1] - unit]],
      };
      const updatedElements = elements.map((element) => {
        if (element.id === "wall") {
          return updatedWallElement;
        }
        return element;
      });
      excalidrawAPI?.updateScene({
        elements: updatedElements,
      });
    } else {
      const lineElement = {
        id: "wall",
        type: "line",
        x: 200,
        strokeColor: "#000",
        y: 200,
        strokeStyle: "solid",
        strokeWidth: 1,
        roughness: 0,
        points: [
          [0, 0],
          [parseInt(length), 0],
        ],
      };
      excalidrawAPI?.updateScene({
        elements: convertToExcalidrawElements([lineElement] as any, {
          regenerateIds: false,
        }),
      });
    }
    setLength("");
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={drawSquare} style={{ marginBottom: 10 }}>
          Draw square of 500px width and 300 height
        </button>
        <button
          onClick={drawLineWithWidthLabelOnCenterOfLine}
          style={{ marginBottom: 10 }}
        >
          Draw line with label
        </button>
        <div>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button disabled={!length} onClick={handleLeftClick}>
            left
          </button>
          <button disabled={!length} onClick={handleRightClick}>
            right
          </button>
          <button disabled={!length} onClick={handleUpClick}>
            up
          </button>
          <button disabled={!length} onClick={handleDownClick}>
            down
          </button>
        </div>
      </div>

      <div style={{ height: "80vh", width: "100vw" }}>
        <Excalidraw
          excalidrawAPI={(api: ExcalidrawImperativeAPI) =>
            setExcalidrawAPI(api)
          }
          onChange={(elements: any) => {
            onchangeElements(elements);
          }}
        />
      </div>
    </>
  );
}

export default App;
