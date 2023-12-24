import multer from "multer";

export const uploadFile = (path = String) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        req.body.name?.split(" ").join("_") +
          "-" +
          file.fieldname?.split(" ").join("_") +
          "-" +
          uniqueSuffix +
          ".png" ||
          req.body.title?.split(" ").join("_") +
            "-" +
            file.fieldname?.split(" ").join("_") +
            "-" +
            uniqueSuffix +
            ".png"
      );
    },
  });

  const upload = multer({ storage: storage });
  return upload;
};

export const zodiac_name = (date) => {
  const data = new Date(date);
  const ngay = data.getDate();
  const thang = data.getMonth() + 1;
  let name = "";

  switch (thang) {
    case 1:
      if (ngay <= 19 && ngay > 0) {
        name = "Capricorn";
      } else if (ngay > 19 && ngay <= 31) {
        name = "Aquarius";
      }
      break;

    case 2:
      if (ngay <= 18 && ngay > 0) {
        name = "Aquarius";
      } else if (ngay > 18 && ngay <= 28) {
        name = "Pisces";
      }
      break;

    case 3:
      if (ngay <= 20 && ngay > 0) {
        name = "Pisces";
      } else if (ngay > 20 && ngay <= 31) {
        name = "Aries";
      }
      break;

    case 4:
      if (ngay <= 19 && ngay > 0) {
        name = "Aries";
      } else if (ngay > 19 && ngay <= 30) {
        name = "Taurus";
      }
      break;

    case 5:
      if (ngay <= 20 && ngay > 0) {
        name = "Taurus";
      } else if (ngay > 20 && ngay <= 31) {
        name = "Gemini";
      }
      break;

    case 6:
      if (ngay <= 21 && ngay > 0) {
        name = "Gemini";
      } else if (ngay > 21 && ngay <= 30) {
        name = "Cancer";
      }
      break;

    case 7:
      if (ngay <= 22 && ngay > 0) {
        name = "Cancer";
      } else if (ngay > 22 && ngay <= 31) {
        name = "Leo";
      }
      break;

    case 8:
      if (ngay <= 22 && ngay > 0) {
        name = "Leo";
      } else if (ngay > 22 && ngay <= 31) {
        name = "Virgo";
      }
      break;

    case 9:
      if (ngay <= 22 && ngay > 0) {
        name = "Virgo";
      } else if (ngay > 22 && ngay <= 30) {
        name = "Libra";
      }
      break;

    case 10:
      if (ngay <= 23 && ngay > 0) {
        name = "Libra";
      } else if (ngay > 23 && ngay <= 31) {
        name = "Scorpio";
      }
      break;

    case 11:
      if (ngay <= 21 && ngay > 0) {
        name = "Scorpio";
      } else if (ngay > 21 && ngay <= 30) {
        name = "Sagittarius";
      }
      break;

    case 12:
      if (ngay <= 21 && ngay > 0) {
        name = "Sagittarius";
      } else if (ngay > 21 && ngay <= 31) {
        name = "Capricorn";
      }
      break;

    default:
      break;
  }

  return name;
};
