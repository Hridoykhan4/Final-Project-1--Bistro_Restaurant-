import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ items, title, desc, coverImage }) => {
  return (
    <div>
      {title && <Cover img={coverImage} title={title} desc={desc}></Cover>}
      <div className="grid sm:grid-cols-2 gap-8 my-6 max-w-7xl mx-auto px-4 sm:px-0">
        {items?.map((item) => (
          <MenuItem item={item} key={item._id}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
