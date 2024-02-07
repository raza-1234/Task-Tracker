export const buildTaskPayload = (count) => {
  const tasks = [];

  for (let i=1; i <= count; i++){
    tasks.push({
      checked: false,
      date: `2024-02-0${i}`,
      description: `Fake Description ${i}`,
      id: i,
      task: `Fake Title ${i}`,
      time: `05:0${i}`
    })
  }
  return tasks;
}