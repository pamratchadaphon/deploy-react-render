import PropTypes from 'prop-types'

const SelectType = ({ setType }) => {
  return (
    <div>
      <select
        name="type"
        id="type"
        className="border border-gray-300 rounded-lg p-2 text-sm bg-gray-50 text-gray-500"
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">ประเภท</option>
        <option value="รายรับ">รายรับ</option>
        <option value="รายจ่าย">รายจ่าย</option>
      </select>
    </div>
  );
};

SelectType.propTypes = {
  setType: PropTypes.func
}

export default SelectType;
