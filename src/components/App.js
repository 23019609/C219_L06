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

function Item({ item }) {
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
        <li style={{ textDecoration: item.packed ? "line-through" : "none" }}>
            {item.description} ({item.quantity})
        </li>
    );
}

function PackingList({ items }) {
    return (
        <div className="list">
            <ul>
                {items.map((item) => (
                    <Item item={item} key={item.id} />
                ))}
            </ul>
        </div>
    );
}

function Stats() {
    return (
        <footer className="stats">
            <em>You have X items in the list. You already packed Y (Z%).</em>
        </footer>
    );
}

function App() {
    const [items, setItems] = useState([]);

    function handleAddItem(item) {
        setItems((prev) => [...prev, item]);
    }

    return (
        <div className="app">
            <Logo />
            <Form handleAddItem={handleAddItem} />
            <PackingList items={items} />
            <Stats />
        </div>
    );
}

export default App;
