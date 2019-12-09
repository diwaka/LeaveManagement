export const RouteDefinition = {
    homePath: "home",
    home() {
        return this.homePath;
    },
    leaveTypePath: "leave/type",
    leaveType() {
        return this.leaveTypePath;
    },
    addLeaveTypePath: "leave/type/form",
    addLeaveType() {
        return this.addLeaveTypePath;
    },
    editLeaveTypePath: "leave/type/form/:id",
    editLeaveType(id) {
        return this.addLeaveTypePath + "/" + id;
    },

}
export const Constants = {
    routes: RouteDefinition
};
