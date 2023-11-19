import Database from "../Database/index.js";

function ModuleRoutes(app) {
  /**
   * Gets the modules for course with courseID
   */
  app.get("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    const modules = Database.modules.filter((m) => m.courseId === cid);
    console.log(modules);
    res.send(modules);
  });

  /**
   * Adds a module with the given course id
   */
  app.post("/api/courses/:cid/modules", (req, res) => {
    const { cid } = req.params;
    console.log(cid)
    console.log(req.body)
    const newModule = {
      ...req.body,
      courseId: cid,
      _id: new Date().getTime().toString(),
    };
    Database.modules.push(newModule);
    res.send(newModule);
  });

  /**
   * Deletes a module with the given module id
   */
  app.delete("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    Database.modules = Database.modules.filter((m) => m._id !== Number(mid));
    res.sendStatus(200);
    console.log(Database.modules)
  });

  /**
   * Updates module with the given id
   */
  app.put("/api/modules/:mid", (req, res) => {
    const { mid } = req.params;
    const moduleIndex = Database.modules.findIndex(
      (m) => m._id === Number(mid));
    const newModule = {
      ...Database.modules[moduleIndex],
      ...req.body
    };
    Database.modules[moduleIndex] = newModule
    res.send(newModule);
    console.log('here')
    console.log(newModule)
    console.log(Database.modules)

  });



}
export default ModuleRoutes;