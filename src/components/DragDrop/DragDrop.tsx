import './DragDrop.css'
import useDragDrop from '../../hooks/useDragDrop';

type DragDropProps = {
    data: string[];
}

const DragDrop = ({data}: DragDropProps) => {
    const { items, handleDrag, handleDrop, handleDragOver, handleDropDelete} = useDragDrop();

    return (
        <section className='dragdrop'>
            
            <div onDragOver={handleDragOver} onDrop={handleDropDelete}>
                <h1>Drag</h1>
                {data.map((item) => {
                    return <div 
                    key={item} 
                    draggable
                    onDragStart={((e) => handleDrag(e, item))}>{item}</div>
                })}
            </div>

            <div onDrop={handleDrop} onDragOver={handleDragOver}>
                <h1>Drop</h1>
                {items.map((item) => {
                    return <div draggable onDragStart={((e) => handleDrag(e, item.item))}>
                        <p>{item.item} <b>{item.quantity > 1 ? 'x' + item.quantity : null}</b></p>
                    </div>
                })
                }
            </div>

        </section>
    )
}

export default DragDrop;