import { Vec3d } from "../src/BasicTypes/Vec3d"




test("length", () => {
    expect(new Vec3d(1, 0, 0).length).toEqual(1)
    expect(new Vec3d(0, 1, 0).length).toEqual(1)
    expect(new Vec3d(0, 0, 1).length).toEqual(1)
    expect(new Vec3d(1, 2, 3).length).toEqual(3.7416573867739413)
})


test("Multiply by scalar", () => {
    expect(new Vec3d(2, 2, 2).mult(2)).toEqual(new Vec3d(4, 4, 4))
    expect(new Vec3d(1, -2, 3).mult(3.5)).toEqual(new Vec3d(3.5, -7, 10.5,))
})

test("Divide by scalar", () => {
    expect(new Vec3d(1, -2, 3,).div(2)).toEqual(new Vec3d(0.5, -1, 1.5))
})


test("Dot product", () => {
    expect(new Vec3d(1, 2, 3).dot(new Vec3d(2,3,4))).toEqual(20)
})