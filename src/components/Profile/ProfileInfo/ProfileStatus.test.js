import React from 'react'
import {create} from 'react-test-renderer'
import ProfileStatus from "./ProfileStatus";


describe("ProfileStatus component", () => {
    test("status in props should be on the state", () =>{
        const component = create(<ProfileStatus status={"learning react"}/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe("learning react")
    })
    test('after creation span should be displayed instead input', () => {
        const component = create(<ProfileStatus status={'hi'}/>)
        const span = component.root.findByType('span');
        expect(() => {
            component.root.findByType('input');
        }).toThrow();
        expect(span.props.children[1]).toBe('hi');

    }
    )
    test('input should be displayed', () => {
        const component = create(<ProfileStatus status={'hi'}/>)
        const span = component.root.findByType('span');
        span.props.onDoubleClick()
        const input = component.root.findByType('input');
        expect(input.props.value).toBe('hi');

    }
    )
    test('callback should be called', () => {
        const callback = jest.fn();
        const component = create(<ProfileStatus status={'hi'} updateStatus={callback}
        />)
        const instance = component.getInstance();
        instance.deactivateEditMode();
        expect(callback.mock.calls.length).toBe(1);

    }
    )
})