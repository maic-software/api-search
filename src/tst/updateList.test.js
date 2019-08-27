import { idList, pathList, updateList } from "../imp/sharedValues";


function testUpdateList() {
  for(let i = 0 ; i < 5 ; i++) {
    idList.push([]);
    pathList.push([]);
  }

  expect(updateList(3,"certainlyNotAnId","certainlyNotAPath")).toBe("");
  expect(updateList(0,"certainlyAnId","certainlyAPath")).toBe("");
  expect(updateList(0,"certainlyAnIdTwice","certainlyAPathTwice")).toBe("");
  idList.push([]);
  pathList.push([]);
  expect(updateList(5,"anIdForSure","aPathForSure")).toBe("");
  expect(updateList(1,"thatsAnId","thatsaPath")).toBe("");
  expect(updateList(0,"certainlyAnIdAgain","certainlyAPathAgain")).toBe("");
  idList.push([]);
  pathList.push([]);

  expect(idList.length).toBe(7);
  expect(pathList.length).toBe(7);

  expect(idList[0].length).toBe(3);
  expect(pathList[0].length).toBe(3);
  expect(idList[0][0]).toBe("certainlyAnId");
  expect(pathList[0][0]).toBe("certainlyAPath");
  expect(idList[0][1]).toBe("certainlyAnIdTwice");
  expect(pathList[0][1]).toBe("certainlyAPathTwice");
  expect(idList[0][2]).toBe("certainlyAnIdAgain");
  expect(pathList[0][2]).toBe("certainlyAPathAgain");

  expect(idList[1].length).toBe(1);
  expect(pathList[1].length).toBe(1);
  expect(idList[1][0]).toBe("thatsAnId");
  expect(pathList[1][0]).toBe("thatsaPath");

  expect(idList[2].length).toBe(0);
  expect(pathList[2].length).toBe(0);

  expect(idList[3].length).toBe(1);
  expect(pathList[3].length).toBe(1);
  expect(idList[3][0]).toBe("certainlyNotAnId");
  expect(pathList[3][0]).toBe("certainlyNotAPath");

  expect(idList[4].length).toBe(0);
  expect(pathList[4].length).toBe(0);

  expect(idList[5].length).toBe(1);
  expect(pathList[5].length).toBe(1);
  expect(idList[5][0]).toBe("anIdForSure");
  expect(pathList[5][0]).toBe("aPathForSure");

  expect(idList[6].length).toBe(0);
  expect(pathList[6].length).toBe(0);
}

test("Filling the general arrays for preview indexing",testUpdateList);
