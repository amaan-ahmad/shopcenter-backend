const cloudinary = require("cloudinary").v2;
const axios = require("axios").default;

async function uploadImage(name, file) {
  if (file === undefined) {
    file =
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/close-up-of-cat-wearing-sunglasses-while-sitting-royalty-free-image-1571755145.jpg";
  }

  console.log(name);

  const entity_name = name.trim();
  const timestamp = Math.round(new Date().getTime() / 1000);

  const _pid =
    process.env.CLOUDINARY_BASE_DIR +
    "/" +
    entity_name.split(" ").join("-") +
    "-" +
    timestamp.toString();

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      eager: "w_400,h_300,c_pad|w_260,h_200,c_crop",
      public_id: _pid,
    },
    process.env.CLOUDINARY_API_SECRET
  );
  console.log(signature);
  return {
    timestamp,
    eager,
    public_id: _pid,
    signature,
  };
}

module.exports = { uploadImage };

//   var curl_body_data = `file=${file}&api_key=${process.env.CLOUDINARY_API_KEY}&eager=w_400,h_300,c_pad|w_260,h_200,c_crop&public_id=${_pid}&timestamp=${timestamp}&signature=${signature}`;

//   var curl_command =
//     'curl -d "' +
//     curl_body_data +
//     `" -X POST http://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUDNAME}/image/upload`;

//   console.log("curl command:", curl_command);

//   axios
//     .post(
//       `http://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUDNAME}/image/upload`,
//       curl_body_data,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     )
//     .then((res) => {
//       console.log(res.data);
//       return res.data.secure_url;
//     })
//     .catch((e) => console.log(e));
