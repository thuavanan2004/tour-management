import Tour from "../../models/tour.model";

export const index = async (req, res) => {
  const tours = await Tour.findAll({
    where: {
      deleted: false,
      status: "active",
    },
    raw: true,
  });

  res.render("client/pages/tours/index", {
    tours: tours,
  });
};
