const decisionData: Decision = {
  choices: [
    { desc: "test", ranks: [1] },
    { desc: "test2", ranks: [2] },
    { desc: "test32", ranks: [2] },
    { desc: "test4", ranks: [2] },
    { desc: "test5", ranks: [2] },
    { desc: "test6", ranks: [2] },
    { desc: "test7", ranks: [2] },
  ],
  criteria: [{ desc: "test", weight: 1 }],
};
import {
  Button,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableColumn,
  getKeyValue,
} from "@nextui-org/react";
import { useMemo, useState } from "react";

import { NumericInputWithBlur } from "./NumericInputWithBlur";
import LoadFromLocalStorage from "./LoadFromLocalStorage";

function App() {
  const [_decision, setDecision] = useState<Decision>(decisionData);

  // const compute totals on decisions

  const decision = useMemo(() => {
    // add a total field to each choice

    const totals = _decision.choices.map((choice) => {
      // sum up the ranks weighted by the criteria
      const sum = choice.ranks.reduce(
        (acc, rank, idx) => acc + rank * _decision.criteria[idx].weight,
        0
      );
      // multiply by the weight
      return sum;
    });

    // put the totals on the choice

    const newDecision = {
      ..._decision,
      choices: _decision.choices.map((choice, idx) => ({
        ...choice,
        total: totals[idx],
      })),
    };

    return newDecision;
  }, [_decision]);

  const columns = [
    { key: "desc", label: "Choices" },
    // ranks-- mapped
    ...decision.criteria.map((c, idx) => ({
      key: `ranks[${idx}]`,
      label: c.desc,
    })),
    { key: "total", label: "Total" },
  ];

  const handleAddChoice = () => {
    const newChoice = prompt("Enter a choice");
    if (!newChoice) return;

    setDecision({
      ...decision,
      choices: [
        ...decision.choices,
        {
          desc: newChoice,
          // ensure choice ranks are correct length
          ranks: decision.criteria.map(() => 1),
        },
      ],
    });
  };

  const handleAddCriteria = () => {
    const newCriteria = prompt("Enter a criteria");
    if (!newCriteria) return;

    setDecision({
      ...decision,
      criteria: [...decision.criteria, { desc: newCriteria, weight: 1 }],
      // ensure choice ranks are correct length
      choices: decision.choices.map((c) => ({
        ...c,
        ranks: [...c.ranks, 1],
      })),
    });
  };

  return (
    <div className="w-full flex flex-col items-center p-10">
      <div className="flex flex-col gap-4 max-w-4xl justify-center">
        <h1 className="text-4xl">Decision Maker</h1>
        <p>
          Use this tool to help make a decision. Add your choices, criteria,
          weights, and ranks to see how things stack up!
        </p>
        <div className="flex gap-2">
          <Button onClick={handleAddChoice}>Add Choice</Button>
          <Button onClick={handleAddCriteria}>Add Criteria</Button>

          <LoadFromLocalStorage decision={decision} onLoaded={setDecision} />
        </div>
        <div>
          <Table isStriped>
            <TableHeader columns={columns}>
              {(column) => {
                if (column.key.startsWith("ranks")) {
                  const idx = parseInt(
                    column.key.replace("ranks[", "").replace("]", "")
                  );
                  return (
                    <TableColumn key={column.key} className="p-2">
                      <div className="flex flex-col gap-1">
                        <div>{column.label}</div>
                        <div className="w-20 h-6">
                          <NumericInputWithBlur
                            value={decision.criteria[idx].weight}
                            onChange={(value) => {
                              const newCriteria = [...decision.criteria];
                              newCriteria[idx].weight = value;
                              setDecision({
                                ...decision,
                                criteria: newCriteria,
                              });
                            }}
                          />
                        </div>
                      </div>
                    </TableColumn>
                  );
                }

                return (
                  <TableColumn key={column.key}>{column.label} </TableColumn>
                );
              }}
            </TableHeader>
            <TableBody items={decision.choices}>
              {(item) => (
                <TableRow key={item.desc}>
                  {(columnKey) => {
                    const key = String(columnKey);
                    if (key.startsWith("ranks")) {
                      const idx = parseInt(
                        key.replace("ranks[", "").replace("]", "")
                      );
                      const rank = item.ranks[idx];
                      return (
                        <TableCell key={key}>
                          <div className="w-20">
                            <NumericInputWithBlur
                              value={rank}
                              onChange={(value) => {
                                const newChoices = [...decision.choices];
                                newChoices[
                                  decision.choices.indexOf(item)
                                ].ranks[idx] = value;
                                setDecision({
                                  ...decision,
                                  choices: newChoices,
                                });
                              }}
                            />
                          </div>
                        </TableCell>
                      );
                    }

                    if (key === "desc") {
                      return (
                        <TableCell key="desc">
                          <div className="flex gap-2 items-center">
                            {item.desc}
                            <Button
                              size="sm"
                              onClick={() => {
                                const newChoices = [...decision.choices];
                                newChoices.splice(
                                  decision.choices.indexOf(item),
                                  1
                                );
                                setDecision({
                                  ...decision,
                                  choices: newChoices,
                                });
                              }}
                            >
                              Remove
                            </Button>
                            {/* rename */}
                            <Button
                              size="sm"
                              onClick={() => {
                                const newName = prompt("New name:");
                                if (!newName) return;

                                const newChoices = [...decision.choices];
                                newChoices[
                                  decision.choices.indexOf(item)
                                ].desc = newName;
                                setDecision({
                                  ...decision,
                                  choices: newChoices,
                                });
                              }}
                            >
                              Rename
                            </Button>
                          </div>
                        </TableCell>
                      );
                    }

                    if (key === "total") {
                      return <TableCell key="total">{item.total}</TableCell>;
                    }

                    return (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    );
                  }}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;
