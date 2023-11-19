import Database from "../Database/index.js"

export default function CourseRoutes(app) {

  /** 
   * Gets all the courses 
   */
  app.get("/api/courses", (req, res) => {
    const courses = Database.courses;
    res.send(courses);
  });

  /**
   * Get a course by id
   */
  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = Database.courses
      .find((c) => c._id === id.toString());
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });


  /**
   * Adds a new course
   */
  app.post("/api/courses", (req, res) => {
    console.log(req.body);
    const course = {
      ...req.body,
      _id: new Date().getTime().toString()
    };
    Database.courses.push(course);
    res.send(course);
  });

  /**
   * Deletes a course by id
   */
  app.delete("/api/courses/:id", (req, res) => {

    const { id } = req.params;
    Database.courses = Database.courses
      .filter((c) => c._id !== id.toString());
    console.log(Database.courses);
    res.sendStatus(204);
  });

  /**
   * Updates a course with the given id
   */
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    let newCourse;
    Database.courses = Database.courses.map((c) =>
      c._id === id ? { c, ...course } : c
    );
    res.send(course);
  });




}