import { useEffect, useState } from "react";
import { postVenta } from "../../../redux/action";
import { useDispatch } from 'react-redux';
import './CreateVenta.css';
import { validationVenta } from "./validation";

export const CreateVenta = () => {

    const dispatch = useDispatch();

    // const storedUser = localStorage.getItem("IdUser");
    // const userStorage = JSON.parse(storedUser);
    // const IdUser = userStorage.usuario.id

    const [newVenta, setNewVenta] = useState({
        producto: "",
        cupo: "",
        franquicia: "",
        tasa: "",
        usuarioId: ""
    });

    const [errors, setErrors] = useState({
        producto: "",
        cupo: "",
        franquicia: "",
        tasa: "",
        usuarioId: ""

    });

   

    useEffect(() => {
        setErrors(validationVenta(newVenta));
    }, [newVenta]);

    const handleCreation = (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            dispatch(postVenta(newVenta));
            setNewVenta({
                producto: "",
                cupo: "",
                franquicia: "",
                tasa: "",
                usuarioId: ""
            });
            setErrors({
                producto: "",
                cupo: "",
                franquicia: "",
                tasa: "",
                usuarioId: ""

            });
        }
    };

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setNewVenta((prevVenta) => {
            let updatedVenta = { ...prevVenta, [name]: value };
            if (name === 'producto' && value !== 'Tarjeta de Credito') {
                updatedVenta.franquicia = '';
            }
            if (name === 'producto' && value === 'Tarjeta de Credito') {
                updatedVenta.tasa = '';
            }
            return updatedVenta;
        });
        setErrors(validationVenta({
            ...newVenta,
            [name]: value
        }));
    };

    const handleCupoChange = ({ target }) => {
        setNewVenta((prevVenta) => ({
            ...prevVenta,
            cupo: target.value
        }));
        setErrors(validationVenta({
            ...newVenta,
        }));
    };

    const renderFranquicia = () => {
        if (newVenta.producto === "Tarjeta de Credito") {
            return (
                <div>
                    <label className="label3">Franquicia</label>
                    <select
                        name="franquicia"
                        id="franquicia"
                        value={newVenta.franquicia}
                        onChange={handleChange}
                    >
                        <option value="">Selecciona una Franquicia...</option>
                        <option value="AMEX">Amex</option>
                        <option value="VISA">Visa</option>
                        <option value="MASTERCARD">Mastercard</option>
                    </select>
                    {errors.franquicia && <label>{errors.franquicia}</label>}
                </div>
            );
        }
        return null;
    };

    const renderTasa = () => {
        if (newVenta.producto !== "Tarjeta de Credito") {
            return (
                <div>
                    <label className="label4">Tasa</label>
                    <input type="text" name='tasa' value={newVenta.tasa}
                        onChange={handleChange} placeholder="ingresa tasa" />
                    {errors.tasa && <label>{errors.tasa}</label>}
                </div>
            );
        }
        return null;
    };

    return (
        <div id="ContCrear">
            <div>
                <label className="label1">Nombre del Producto</label>
                <select name="producto" id="producto" value={newVenta.producto}
                    onChange={handleChange}>
                    <option value="">Selecciona un producto...</option>
                    <option value="Credito de Consumo">Crédito de Consumo</option>
                    <option value="Libranza Libre Inversión">Libranza Libre Inversión</option>
                    <option value="Tarjeta de Credito">Tarjeta de Crédito</option>
                </select>
                {errors.producto && <label>{errors.producto}</label>}
            </div>
            <div>
                <label className="label2">Cupo</label>
                <input type="text" name='cupo' value={newVenta.cupo}
                    onChange={handleCupoChange} placeholder="ingresa Cupo" />
                {errors.cupo && <label>{errors.cupo}</label>}
            </div>
            {renderFranquicia()}
            {renderTasa()}
            <div>
                <label className="label5">Id de Usuario</label>
                <input type="text" name='usuarioId' value={newVenta.usuarioId}
                    onChange={handleChange} placeholder="ingresa Id de Usuario" />
                {errors.usuarioId && <label>{errors.usuarioId}</label>}
            </div>
            <div>
                <button type="submit" onClick={handleCreation} disabled={Object.keys(errors).length > 0}>
                    Crear nuevo Producto
                </button>
            </div>
        </div>
    );
};
