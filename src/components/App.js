import { useState } from "react";

// Initial packing items
// const initialItems = [
//     { id: 1, description: "Shirt", quantity: 5, packed: false },
//     { id: 2, description: "Pants", quantity: 2, packed: true },
// ];

function Logo() {
    return <h1>My Travel List</h1>;
}

function Form({ handleAddItem }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        const item = {
            id: Date.now(),
            description: description,
            quantity: quantity,
            packed: false,
        };

        handleAddItem(item);

        setDescription("");
        setQuantity(1);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function handleQuantity(e) {
        setQuantity(Number(e.target.value));
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need to pack?</h3>
            <select
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={handleQuantity}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <input
                type="text"
                id="item"
                name="item"
                placeholder="Item..."
                value={description}
                onChange={handleDescription}
            />
            <button type="button" onClick={handleSubmit}>
                ADD
            </button>
        </form>
    );
}

function Item({ item, handleDeleteItem, handleUpdateItem }) {
    // if (item.packed) {
    //     listitem = (
    //         <li style={{ textDecoration: "line-through" }}>
    //             {item.description} ({item.quantity})
    //         </li>
    //     );
    // } else {
    //     listitem = (
    //         <li>
    //             {item.description} ({item.quantity})
    //         </li>
    //     );
    // }
    // return listitem;

    return (
        <li
            style={{
                textDecoration: item.packed ? "line-through" : "none",
            }}
        >
            <input
                type="checkbox"
                onChange={() => handleUpdateItem(item.id)}
                checked={item.packed}
            />
            {item.description} ({item.quantity})
            <button type="button" onClick={() => handleDeleteItem(item.id)}>
                ✖
            </button>
        </li>
    );
}

function PackingList({ items, handleDeleteItem, handleUpdateItem }) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item
                        item={item}
                        key={item.id}
                        handleDeleteItem={handleDeleteItem}
                        handleUpdateItem={handleUpdateItem}
                    />
                ))}
            </ul>
        </div>
    );
}

function Stats({ items }) {
    const numItems = items.length;
    // .reduce(accumulator, currentValue) --> both are required, optional ones are currentIndex, array, and initialValue
    // acc = initial or previously returned value
    // cur = value of current element
    const packedItems = items.reduce(
        (acc, cur) => (cur.packed ? acc + 1 : acc),
        0 // initialValue
    );
    const packedFilter = items.filter((item) => item.packed).length;
    // Math.round --> round to nearest whole number
    // Math.ceil --> round up
    // Math.floor --> round down
    // <number>.toFixed(2) --> round to 2 decimal places
    const packedPercentage = Math.round((packedFilter / numItems) * 100);

    return (
        <footer className="stats">
            <em>
                You have {numItems} items in the list. You already packed{" "}
                {packedItems} ({packedPercentage}%).
            </em>
        </footer>
    );
}

function App() {
    const [items, setItems] = useState([]);

    function handleAddItem(item) {
        setItems((prev) => [...prev, item]);
    }

    function handleDeleteItem(targetId) {
        setItems((prev) => prev.filter((item, id) => item.id !== targetId));
    }

    function handleUpdateItem(targetItem) {
        // items.map(function (item, i) {

        // if (item.id === targetItem) {
        //     //check id
        //     item.packed = !item.packed;
        // }

        // if (i.id === targetItem && i.packed === false) {
        //     return (targetItem.packed = true);
        // } else if (i.id === targetItem && i.packed === true) {
        //     return (targetItem.packed = false);
        // }

        const updateItem = items.map(
            (item) =>
                item.id === targetItem
                    ? { ...item, packed: !item.packed } // create new item list with updated packed value
                    : item // if targetItem not found, return original item list
        );

        setItems(updateItem);
    }

    return (
        <div className="app">
            <Logo />
            <Form handleAddItem={handleAddItem} />
            <PackingList
                items={items}
                handleDeleteItem={handleDeleteItem}
                handleUpdateItem={handleUpdateItem}
            />
            <Stats items={items} />
        </div>
    );
}

export default App;
