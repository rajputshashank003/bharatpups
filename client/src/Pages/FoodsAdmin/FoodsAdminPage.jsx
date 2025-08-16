import { useEffect, useState } from 'react';
import classes from './foodsAdminPage.module.css';
import { Link, useParams } from 'react-router-dom';
import { deleteById, getAll, searchFood } from '../../Services/services.js';
import NotFound from '../../components/NotFound/NotFound';
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search';
import Price from '../../components/Price/Price';
import { toast } from 'react-toastify';
import { getUser } from '../../Services/userService.js';
import GetShortName from '../../components/GetShortName/GetShortName.jsx';

export default function FoodsAdminPage() {
    const [foods, setFoods] = useState();
    const { searchTerm } = useParams();

    useEffect(() => {
        loadFoods();
    }, [searchTerm]);

    useEffect(() => {
        loadFoods();
    }, []);

    const loadFoods = async () => {
        // optimise it like on home page using while in view from framer motion --------------------//
        const foods = searchTerm ? await searchFood(searchTerm) : await getAll(getUser().id ?? "", 0, 'admin_page');
        setFoods(foods.data);
    };

    const FoodsNotFound = () => {
        if (foods && foods.length > 0) return;

        return searchTerm ? (
            <NotFound linkRoute="/admin/foods" linkText="Show All" />
        ) : (
            <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
        );
    };


    const deleteFood = async food => {
        const confirmed = window.confirm(`Delete Food ${food.name}?`);
        if (!confirmed) return;

        await deleteById(food.id);
        toast.success(`"${food.name}" Has Been Removed!`);
        setFoods(foods.filter(f => f.id !== food.id));
    };

    return (
        <div className={classes.container}>
            <div className={classes.list}>
                <div className="title text-[40px] font-bold text-red-500 w-screen flex justify-center m-0 items-center">
                    Manage Foods
                </div>
                <Search
                    searchRoute="/admin/foods/"
                    defaultRoute="/admin/foods"
                    margin="0 0 0 0"
                    placeholder="Search Admin Foods"
                />
                <Link to="/admin/addFood" className={classes.add_food + " mx-4 my-2"}>
                    Add Food +
                </Link>
                <FoodsNotFound />
                <div className='flex flex-col duration-300 md:flex-row md:flex-wrap gap-2 justify-center items-center'>
                    {foods &&
                        foods.map(food => (
                            <div key={food.id} className='flex p-2 hover:shadow-[0px_0px_4px] duration-200 shadow-black flex-row w-[340px] sm:w-[400px] justify-center items-center bg-gray-100 rounded-[10px]'>
                                <Link className={"text-[20px] sm:gap-4 m-0 flex flex-row w-full justify-start items-center"} to={'/food/' + food.id}>
                                    <img src={food.imageUrl} className='h-[80px] hover:z-[99] hover:scale-[2.5] duration-300 object-cover w-[30%] rounded-[12px]' alt={food.name} />
                                    <div className="flex flex-col sm:gap-2 w-[70%] relative ">
                                        <div className='flex flex-row h-[35px] justify-between w-full  items-center'>
                                            <div className='gap-0 flex flex-row'>
                                                <GetShortName food_name={food.name} />
                                            </div>
                                            <Price price={food.price} />
                                        </div>
                                        <div className="links h-[35px] w-full flex flex-row gap-2 ">
                                            <Link className='m-0 hover:shadow-[0px_0px_4px] shadow-black duration-200 bg-gray-300 p-1 rounded-[5px] px-2' to={'/admin/editFood/' + food.id}>Edit</Link>
                                            <Link className='m-0 hover:shadow-[0px_0px_4px] shadow-black duration-200 bg-gray-300 p-1 rounded-[5px] px-2' onClick={() => deleteFood(food)}>Delete</Link>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
                {/* {foods &&
          foods.map(food => (
            <div key={food.id} className={classes.list_item}>
              <img src={food.imageUrl} alt={food.name} />
              <Link className={classes.food_name} to={'/food/' + food.id}>{food.name}</Link>
              <Price price={food.price} />
              <div className={classes.actions}>
                <Link to={'/admin/editFood/' + food.id}>Edit</Link>
                <Link onClick={() => deleteFood(food)}>Delete</Link>
              </div>
            </div>
          ))} */}
            </div>
        </div>
    );
}
