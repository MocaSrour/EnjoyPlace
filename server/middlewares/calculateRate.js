const Place = require("../../models/Place");
const Rate = require("../../models/Rate");

module.exports.calculateRate = async (idd) => {
    console.log(idd);
  const { count, edited } = await Rate.findAndCountAll({ where: { id: idd } });
  console.log(count, edited);
  const rateSum = edited.reduce((acc, curr) => acc + curr.rate, 0);
  rateSum /= count;

  const editedRate = await Place.update(
    { rate: rateSum },
    {
      where: {
        id: idd,
      },
    }
  );
  return editedRate;
};
