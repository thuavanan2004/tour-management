import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import moment from "moment";
import { QueryTypes } from "sequelize";
import sequelize from "../../config/database";

// [GET] /tours/
export const index = async (req: Request, res: Response) => {
  const sortKey = req.query.sortKey;
  const sortValue = req.query.sortValue;

  try {
    let orderByClause = "ORDER BY price_special ASC";
    if (sortKey === "name") {
      orderByClause = "ORDER BY tours.title ASC";
    } else if (sortKey === "price") {
      orderByClause = `ORDER BY price_special ${
        sortValue === "desc" ? "DESC" : "ASC"
      }`;
    }

    const query = `
      SELECT tours.*, ROUND(price * (1 - discount/100), 0) AS price_special
      FROM tours
      JOIN tours_categories ON tours.id = tours_categories.tour_id
      JOIN categories ON tours_categories.category_id = categories.id
      WHERE
        categories.deleted = false
        AND categories.status = 'active'
        AND tours.deleted = false
        AND tours.status = 'active'
      ${orderByClause}
    `;

    const tours = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    // Process tours data
    for (const tour of tours) {
      tour["timeStart"] = moment().format("DD MM YYYY");
      tour["images"] = JSON.parse(tour["images"]);
      tour["price_special"] = +tour["price_special"];
    }

    res.render("client/pages/tours/index", {
      pageTitle: "Tour",
      tours: tours,
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    res.status(500).send("Internal Server Error");
  }
};

// [GET] /tours/:slugCategory
export const category = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;
  const sortKey = req.query.sortKey;
  const sortValue = req.query.sortValue;

  try {
    let orderByClause = "ORDER BY price_special ASC";
    if (sortKey === "name") {
      orderByClause = "ORDER BY tours.title ASC";
    } else if (sortKey === "price") {
      orderByClause = `ORDER BY price_special ${
        sortValue === "desc" ? "DESC" : "ASC"
      }`;
    }

    const query = `
      SELECT tours.*, ROUND(price * (1 - discount/100), 0) AS price_special
      FROM tours
      JOIN tours_categories ON tours.id = tours_categories.tour_id
      JOIN categories ON tours_categories.category_id = categories.id
      WHERE
        categories.slug = :slugCategory
        AND categories.deleted = false
        AND categories.status = 'active'
        AND tours.deleted = false
        AND tours.status = 'active'
      ${orderByClause}
    `;

    const tours = await sequelize.query(query, {
      replacements: { slugCategory },
      type: QueryTypes.SELECT,
    });

    // Process tours data
    for (const tour of tours) {
      tour["timeStart"] = moment().format("DD MM YYYY");
      tour["images"] = JSON.parse(tour["images"]);
      tour["price_special"] = +tour["price_special"];
    }

    res.render("client/pages/tours/index", {
      pageTitle: "Tour",
      tours: tours,
    });
  } catch (error) {
    console.error("Error fetching tours:", error);
    res.status(500).send("Internal Server Error");
  }
};

// [GET] /tours/:slugCategory
export const detail = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  const tour = await sequelize.query(
    `
    SELECT * FROM tours
      WHERE slug = :slug
    `,
    {
      replacements: { slug },
      type: QueryTypes.SELECT,
    }
  );
  console.log(tour);
  res.render("client/pages/tours/detail", {
    pageTitle: tour["title"],
    tour: tour,
  });
};

// [GET] /tour/search
export const search = async (req: Request, res: Response) => {
  console.log(req.query);
  res.send("ok");
};
