/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(3);
const app_controller_1 = __webpack_require__(4);
const app_service_1 = __webpack_require__(5);
const config_1 = __webpack_require__(6);
const configuration_1 = __webpack_require__(7);
const typeorm_1 = __webpack_require__(8);
const typeorm_config_1 = __webpack_require__(9);
const group_module_1 = __webpack_require__(19);
const expense_module_1 = __webpack_require__(28);
const settle_up_module_1 = __webpack_require__(37);
const auth_module_1 = __webpack_require__(42);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: typeorm_config_1.typeOrmConfig,
            }),
            group_module_1.GroupModule,
            expense_module_1.ExpenseModule,
            settle_up_module_1.SettleUpModule,
            auth_module_1.AuthModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);


/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 4 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const common_1 = __webpack_require__(3);
const app_service_1 = __webpack_require__(5);
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHello() {
        return this.appService.getHello();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 5 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const common_1 = __webpack_require__(3);
let AppService = class AppService {
    getHello() {
        return 'Hello World!';
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        password: process.env.DATABASE_PASSWORD,
        user: process.env.DATABASE_USER,
        name: process.env.DATABASE_NAME,
    },
});


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.typeOrmConfig = void 0;
const entities_1 = __webpack_require__(10);
const typeOrmConfig = (configService) => ({
    type: 'postgres',
    host: configService.get('database.host'),
    port: configService.get('database.port'),
    username: configService.get('database.user'),
    password: configService.get('database.password'),
    database: configService.get('database.name'),
    entities: [entities_1.BaseEntityClass, entities_1.ExpenseGroupEntity, entities_1.ExpenseEntity, entities_1.SplitEntity, entities_1.UserEntity],
    synchronize: false,
});
exports.typeOrmConfig = typeOrmConfig;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = exports.SplitEntity = exports.ExpenseEntity = exports.ExpenseGroupEntity = exports.BaseEntityClass = void 0;
var base_entity_1 = __webpack_require__(11);
Object.defineProperty(exports, "BaseEntityClass", ({ enumerable: true, get: function () { return base_entity_1.BaseEntityClass; } }));
var expense_group_entity_1 = __webpack_require__(13);
Object.defineProperty(exports, "ExpenseGroupEntity", ({ enumerable: true, get: function () { return expense_group_entity_1.ExpenseGroupEntity; } }));
var expense_entity_1 = __webpack_require__(16);
Object.defineProperty(exports, "ExpenseEntity", ({ enumerable: true, get: function () { return expense_entity_1.ExpenseEntity; } }));
var split_entity_1 = __webpack_require__(18);
Object.defineProperty(exports, "SplitEntity", ({ enumerable: true, get: function () { return split_entity_1.SplitEntity; } }));
var user_entity_1 = __webpack_require__(14);
Object.defineProperty(exports, "UserEntity", ({ enumerable: true, get: function () { return user_entity_1.UserEntity; } }));


/***/ }),
/* 11 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseEntityClass = void 0;
const typeorm_1 = __webpack_require__(12);
class BaseEntityClass {
}
exports.BaseEntityClass = BaseEntityClass;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BaseEntityClass.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseEntityClass.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseEntityClass.prototype, "updated_at", void 0);


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpenseGroupEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const base_entity_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(14);
let ExpenseGroupEntity = class ExpenseGroupEntity extends base_entity_1.BaseEntityClass {
};
exports.ExpenseGroupEntity = ExpenseGroupEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExpenseGroupEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.groups),
    (0, typeorm_1.JoinColumn)({ name: 'owner_id' }),
    __metadata("design:type", typeof (_a = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _a : Object)
], ExpenseGroupEntity.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinTable)({
        name: 'expense_group_members',
        joinColumn: { name: 'expense_group_id' },
        inverseJoinColumn: { name: 'member_id' },
    }),
    __metadata("design:type", Array)
], ExpenseGroupEntity.prototype, "members", void 0);
exports.ExpenseGroupEntity = ExpenseGroupEntity = __decorate([
    (0, typeorm_1.Entity)('expense_groups')
], ExpenseGroupEntity);


/***/ }),
/* 14 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const class_transformer_1 = __webpack_require__(15);
const base_entity_1 = __webpack_require__(11);
const typeorm_1 = __webpack_require__(12);
const expense_group_entity_1 = __webpack_require__(13);
let UserEntity = class UserEntity extends base_entity_1.BaseEntityClass {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.OneToMany)(() => expense_group_entity_1.ExpenseGroupEntity, (group) => group.owner),
    __metadata("design:type", Array)
], UserEntity.prototype, "groups", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)('users')
], UserEntity);


/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpenseEntity = void 0;
const typeorm_1 = __webpack_require__(12);
const base_entity_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(14);
const expense_group_entity_1 = __webpack_require__(13);
const split_type_enum_1 = __webpack_require__(17);
const split_entity_1 = __webpack_require__(18);
let ExpenseEntity = class ExpenseEntity extends base_entity_1.BaseEntityClass {
    getTotalAmount() {
        return this.expense;
    }
    getUserIds() {
        return this.users.map((user) => user.id);
    }
};
exports.ExpenseEntity = ExpenseEntity;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ExpenseEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: split_type_enum_1.SplitType }),
    __metadata("design:type", typeof (_a = typeof split_type_enum_1.SplitType !== "undefined" && split_type_enum_1.SplitType) === "function" ? _a : Object)
], ExpenseEntity.prototype, "split_type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        precision: 10,
        scale: 2,
        transformer: { to: (v) => v, from: (v) => parseFloat(v) },
    }),
    __metadata("design:type", Number)
], ExpenseEntity.prototype, "expense", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => expense_group_entity_1.ExpenseGroupEntity),
    (0, typeorm_1.JoinColumn)({ name: 'group_id' }),
    __metadata("design:type", typeof (_b = typeof expense_group_entity_1.ExpenseGroupEntity !== "undefined" && expense_group_entity_1.ExpenseGroupEntity) === "function" ? _b : Object)
], ExpenseEntity.prototype, "group", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'created_by' }),
    __metadata("design:type", typeof (_c = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _c : Object)
], ExpenseEntity.prototype, "created_by", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => split_entity_1.SplitEntity, (split) => split.expense),
    __metadata("design:type", Array)
], ExpenseEntity.prototype, "splits", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinTable)({
        name: 'expense_users',
        joinColumn: { name: 'expense_id' },
        inverseJoinColumn: { name: 'user_id' },
    }),
    __metadata("design:type", Array)
], ExpenseEntity.prototype, "users", void 0);
exports.ExpenseEntity = ExpenseEntity = __decorate([
    (0, typeorm_1.Entity)('expenses')
], ExpenseEntity);


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SplitType = void 0;
var SplitType;
(function (SplitType) {
    SplitType["EQUAL"] = "EQUAL";
    SplitType["EXACT"] = "EXACT";
    SplitType["PERCENTAGE"] = "PERCENTAGE";
})(SplitType || (exports.SplitType = SplitType = {}));


/***/ }),
/* 18 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SplitEntity = void 0;
const class_transformer_1 = __webpack_require__(15);
const typeorm_1 = __webpack_require__(12);
const base_entity_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(14);
const expense_entity_1 = __webpack_require__(16);
let SplitEntity = class SplitEntity extends base_entity_1.BaseEntityClass {
};
exports.SplitEntity = SplitEntity;
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.ManyToOne)(() => expense_entity_1.ExpenseEntity, (expense) => expense.splits),
    (0, typeorm_1.JoinColumn)({ name: 'expense_id' }),
    __metadata("design:type", typeof (_a = typeof expense_entity_1.ExpenseEntity !== "undefined" && expense_entity_1.ExpenseEntity) === "function" ? _a : Object)
], SplitEntity.prototype, "expense", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", typeof (_b = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _b : Object)
], SplitEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision', nullable: false }),
    __metadata("design:type", Number)
], SplitEntity.prototype, "paid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'double precision', nullable: false }),
    __metadata("design:type", Number)
], SplitEntity.prototype, "owed", void 0);
exports.SplitEntity = SplitEntity = __decorate([
    (0, typeorm_1.Entity)('expense_splits')
], SplitEntity);


/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroupModule = void 0;
const common_1 = __webpack_require__(3);
const create_group_controller_1 = __webpack_require__(20);
const add_member_controller_1 = __webpack_require__(24);
const remove_member_controller_1 = __webpack_require__(26);
const get_group_controller_1 = __webpack_require__(27);
const group_service_1 = __webpack_require__(21);
let GroupModule = class GroupModule {
};
exports.GroupModule = GroupModule;
exports.GroupModule = GroupModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            create_group_controller_1.CreateGroupController,
            add_member_controller_1.AddMemberController,
            remove_member_controller_1.RemoveMemberController,
            get_group_controller_1.GetGroupController,
        ],
        providers: [group_service_1.GroupService],
        exports: [group_service_1.GroupService],
    })
], GroupModule);


/***/ }),
/* 20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateGroupController = void 0;
const common_1 = __webpack_require__(3);
const group_service_1 = __webpack_require__(21);
const create_group_dto_1 = __webpack_require__(22);
let CreateGroupController = class CreateGroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async handle(createGroupDto) {
        const { name, creator_id, member_ids } = createGroupDto;
        return this.groupService.createGroup(name, creator_id, member_ids);
    }
};
exports.CreateGroupController = CreateGroupController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof create_group_dto_1.CreateGroupDto !== "undefined" && create_group_dto_1.CreateGroupDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], CreateGroupController.prototype, "handle", null);
exports.CreateGroupController = CreateGroupController = __decorate([
    (0, common_1.Controller)('groups'),
    __metadata("design:paramtypes", [typeof (_a = typeof group_service_1.GroupService !== "undefined" && group_service_1.GroupService) === "function" ? _a : Object])
], CreateGroupController);


/***/ }),
/* 21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroupService = void 0;
const common_1 = __webpack_require__(3);
const entities_1 = __webpack_require__(10);
const typeorm_1 = __webpack_require__(12);
let GroupService = class GroupService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.userRepo = this.dataSource.getRepository(entities_1.UserEntity);
        this.expenseGroupRepo = this.dataSource.getRepository(entities_1.ExpenseGroupEntity);
    }
    async createGroup(name, creatorId, memberIds) {
        const user = await this.userRepo.findOneBy({ id: creatorId });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const members = await this.userRepo.find({ where: { id: (0, typeorm_1.In)(memberIds) } });
        members.push(user);
        const group = this.expenseGroupRepo.create({
            name,
            owner: user,
            members,
        });
        return this.expenseGroupRepo.save(group);
    }
    async addMember(groupId, creatorId, memberId) {
        const group = await this.expenseGroupRepo.findOne({
            where: { id: groupId },
            relations: ['owner', 'members'],
        });
        if (!group) {
            throw new common_1.NotFoundException('Group not found');
        }
        if (group.owner.id !== creatorId) {
            throw new common_1.NotFoundException('You are not the owner of this group');
        }
        const user = await this.userRepo.findOneBy({ id: memberId });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isMember = group.members.some((m) => m.id === user.id);
        if (isMember) {
            throw new Error('User is already a member of this group');
        }
        group.members.push(user);
        const savedGroup = await this.expenseGroupRepo.save(group);
        return savedGroup;
    }
    async removeMember(groupId, creatorId, memberId) {
        const group = await this.expenseGroupRepo.findOne({
            where: { id: groupId },
            relations: ['owner', 'members'],
        });
        if (!group) {
            throw new common_1.NotFoundException('Group not found');
        }
        if (group.owner.id !== creatorId) {
            throw new common_1.NotFoundException('You are not the owner of this group');
        }
        const user = await this.userRepo.findOneBy({ id: memberId });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isMember = group.members.some((m) => m.id === user.id);
        if (!isMember) {
            throw new Error('User is not a member of this group');
        }
        group.members = group.members.filter((m) => m.id !== user.id);
        const savedGroup = await this.expenseGroupRepo.save(group);
        return savedGroup;
    }
    async getGroup(groupId) {
        const group = await this.expenseGroupRepo.findOne({
            where: { id: groupId },
            relations: ['owner', 'members'],
        });
        if (!group) {
            throw new common_1.NotFoundException('Group not found');
        }
        return group;
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], GroupService);


/***/ }),
/* 22 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateGroupDto = void 0;
const class_validator_1 = __webpack_require__(23);
class CreateGroupDto {
}
exports.CreateGroupDto = CreateGroupDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateGroupDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateGroupDto.prototype, "creator_id", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], CreateGroupDto.prototype, "member_ids", void 0);


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 24 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddMemberController = void 0;
const common_1 = __webpack_require__(3);
const group_service_1 = __webpack_require__(21);
const group_member_dto_1 = __webpack_require__(25);
let AddMemberController = class AddMemberController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async handle(group_id, dto) {
        const { creator_id, member_id } = dto;
        return this.groupService.addMember(group_id, creator_id, member_id);
    }
};
exports.AddMemberController = AddMemberController;
__decorate([
    (0, common_1.Post)(':group_id/add'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Param)('group_id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_b = typeof group_member_dto_1.GroupMemberDto !== "undefined" && group_member_dto_1.GroupMemberDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AddMemberController.prototype, "handle", null);
exports.AddMemberController = AddMemberController = __decorate([
    (0, common_1.Controller)('groups'),
    __metadata("design:paramtypes", [typeof (_a = typeof group_service_1.GroupService !== "undefined" && group_service_1.GroupService) === "function" ? _a : Object])
], AddMemberController);


/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroupMemberDto = void 0;
const class_validator_1 = __webpack_require__(23);
class GroupMemberDto {
}
exports.GroupMemberDto = GroupMemberDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GroupMemberDto.prototype, "creator_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], GroupMemberDto.prototype, "member_id", void 0);


/***/ }),
/* 26 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RemoveMemberController = void 0;
const common_1 = __webpack_require__(3);
const group_service_1 = __webpack_require__(21);
const group_member_dto_1 = __webpack_require__(25);
let RemoveMemberController = class RemoveMemberController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async handle(group_id, dto) {
        const { creator_id, member_id } = dto;
        return this.groupService.removeMember(group_id, creator_id, member_id);
    }
};
exports.RemoveMemberController = RemoveMemberController;
__decorate([
    (0, common_1.Delete)(':group_id/remove'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Param)('group_id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, typeof (_b = typeof group_member_dto_1.GroupMemberDto !== "undefined" && group_member_dto_1.GroupMemberDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], RemoveMemberController.prototype, "handle", null);
exports.RemoveMemberController = RemoveMemberController = __decorate([
    (0, common_1.Controller)('groups'),
    __metadata("design:paramtypes", [typeof (_a = typeof group_service_1.GroupService !== "undefined" && group_service_1.GroupService) === "function" ? _a : Object])
], RemoveMemberController);


/***/ }),
/* 27 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetGroupController = void 0;
const common_1 = __webpack_require__(3);
const group_service_1 = __webpack_require__(21);
let GetGroupController = class GetGroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }
    async handle(id) {
        return this.groupService.getGroup(id);
    }
};
exports.GetGroupController = GetGroupController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GetGroupController.prototype, "handle", null);
exports.GetGroupController = GetGroupController = __decorate([
    (0, common_1.Controller)('groups'),
    __metadata("design:paramtypes", [typeof (_a = typeof group_service_1.GroupService !== "undefined" && group_service_1.GroupService) === "function" ? _a : Object])
], GetGroupController);


/***/ }),
/* 28 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpenseModule = void 0;
const common_1 = __webpack_require__(3);
const expense_service_1 = __webpack_require__(29);
const add_expense_controller_1 = __webpack_require__(32);
const get_user_expenses_controller_1 = __webpack_require__(36);
const equal_split_strategy_1 = __webpack_require__(30);
const percentage_split_strategy_1 = __webpack_require__(31);
let ExpenseModule = class ExpenseModule {
};
exports.ExpenseModule = ExpenseModule;
exports.ExpenseModule = ExpenseModule = __decorate([
    (0, common_1.Module)({
        controllers: [add_expense_controller_1.AddExpenseController, get_user_expenses_controller_1.GetUserExpensesController],
        providers: [expense_service_1.ExpenseService, equal_split_strategy_1.EqualSplitStrategy, percentage_split_strategy_1.PercentageSplitStrategy],
    })
], ExpenseModule);


/***/ }),
/* 29 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpenseService = void 0;
const common_1 = __webpack_require__(3);
const entities_1 = __webpack_require__(10);
const split_type_enum_1 = __webpack_require__(17);
const equal_split_strategy_1 = __webpack_require__(30);
const percentage_split_strategy_1 = __webpack_require__(31);
const typeorm_1 = __webpack_require__(12);
let ExpenseService = class ExpenseService {
    constructor(dataSource, equalSplitStrategy, percentageSplitStrategy) {
        this.dataSource = dataSource;
        this.equalSplitStrategy = equalSplitStrategy;
        this.percentageSplitStrategy = percentageSplitStrategy;
        this.expenseGroupRepo = this.dataSource.getRepository(entities_1.ExpenseGroupEntity);
        this.expenseRepo = this.dataSource.getRepository(entities_1.ExpenseEntity);
        this.strategyMap = new Map([
            [split_type_enum_1.SplitType.EQUAL, this.equalSplitStrategy],
            [split_type_enum_1.SplitType.PERCENTAGE, this.percentageSplitStrategy],
        ]);
    }
    async createExpense(dto) {
        const group = await this.expenseGroupRepo.findOne({
            where: { id: dto.group_id },
            relations: ['owner', 'members'],
        });
        if (!group) {
            throw new common_1.NotFoundException('Group not found');
        }
        const users = group.members;
        const createdBy = users.find((u) => u.id === dto.created_by);
        if (!createdBy) {
            throw new common_1.NotFoundException('Creator user not found');
        }
        const expense = this.expenseRepo.create({
            description: dto.description,
            split_type: dto.split_type,
            expense: dto.expense,
            group,
            created_by: createdBy,
            users,
        });
        this.validatePaidTotal(dto.paid_by, dto.expense);
        const paidMap = this.buildPaidMap(dto.paid_by);
        const amountMap = this.buildAmountMap(dto.amounts || []);
        return this.addExpenseWithStrategy(expense, paidMap, amountMap, users);
    }
    validatePaidTotal(paid_by, expenseTotal) {
        const totalPaid = paid_by.reduce((sum, entry) => sum + entry.amount, 0);
        if (Math.abs(totalPaid - expenseTotal) > 0.01) {
            throw new common_1.BadRequestException(`paid_by amounts (${totalPaid}) must equal the expense total (${expenseTotal})`);
        }
    }
    buildPaidMap(paid_by) {
        return new Map(paid_by.map((entry) => [entry.user_id, entry.amount]));
    }
    buildAmountMap(amounts) {
        return new Map(amounts.map((entry) => [entry.user_id, entry.amount]));
    }
    async saveSplits(splits, savedExpense, manager) {
        for (const split of splits) {
            split.expense = savedExpense;
        }
        return manager.save(entities_1.SplitEntity, splits);
    }
    async addExpenseWithStrategy(expense, paidMap, amountMap, users) {
        const strategy = this.strategyMap.get(expense.split_type);
        if (!strategy) {
            throw new common_1.NotFoundException(`No strategy found for split type: ${expense.split_type}`);
        }
        const splits = strategy.calculateSplits(expense, users, paidMap, amountMap);
        return this.dataSource.transaction(async (manager) => {
            const savedExpense = await manager.save(entities_1.ExpenseEntity, expense);
            savedExpense.splits = await this.saveSplits(splits, savedExpense, manager);
            return savedExpense;
        });
    }
    getUserExpenses(userId) {
        return this.expenseRepo.find({
            where: { splits: { user: { id: userId } } },
            relations: ['users', 'splits', 'splits.user'],
        });
    }
};
exports.ExpenseService = ExpenseService;
exports.ExpenseService = ExpenseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object, typeof (_b = typeof equal_split_strategy_1.EqualSplitStrategy !== "undefined" && equal_split_strategy_1.EqualSplitStrategy) === "function" ? _b : Object, typeof (_c = typeof percentage_split_strategy_1.PercentageSplitStrategy !== "undefined" && percentage_split_strategy_1.PercentageSplitStrategy) === "function" ? _c : Object])
], ExpenseService);


/***/ }),
/* 30 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EqualSplitStrategy = void 0;
const common_1 = __webpack_require__(3);
const entities_1 = __webpack_require__(10);
let EqualSplitStrategy = class EqualSplitStrategy {
    calculateSplits(expense, users, paidMap) {
        if (users.length === 0) {
            throw new common_1.BadRequestException('At least one user is required');
        }
        const totalAmount = expense.getTotalAmount();
        const equalShare = totalAmount / users.length;
        const splits = users.map((user) => {
            const split = new entities_1.SplitEntity();
            const paid = paidMap.get(user.id) ?? 0;
            split.expense = expense;
            split.user = user;
            split.paid = paid;
            split.owed = equalShare;
            return split;
        });
        return splits;
    }
};
exports.EqualSplitStrategy = EqualSplitStrategy;
exports.EqualSplitStrategy = EqualSplitStrategy = __decorate([
    (0, common_1.Injectable)()
], EqualSplitStrategy);


/***/ }),
/* 31 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PercentageSplitStrategy = void 0;
const common_1 = __webpack_require__(3);
const entities_1 = __webpack_require__(10);
let PercentageSplitStrategy = class PercentageSplitStrategy {
    calculateSplits(expense, users, paidMap, amountMap) {
        if (!amountMap) {
            throw new common_1.BadRequestException('amountMap is required for percentage split');
        }
        if (users.length === 0) {
            throw new common_1.BadRequestException('At least one user is required');
        }
        const splits = users.map((user) => {
            const split = new entities_1.SplitEntity();
            const paid = paidMap.get(user.id) ?? 0;
            const amount = amountMap.get(user.id) ?? 0;
            split.expense = expense;
            split.user = user;
            split.paid = paid;
            split.owed = amount;
            return split;
        });
        return splits;
    }
};
exports.PercentageSplitStrategy = PercentageSplitStrategy;
exports.PercentageSplitStrategy = PercentageSplitStrategy = __decorate([
    (0, common_1.Injectable)()
], PercentageSplitStrategy);


/***/ }),
/* 32 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddExpenseController = void 0;
const common_1 = __webpack_require__(3);
const expense_service_1 = __webpack_require__(29);
const add_expense_dto_1 = __webpack_require__(33);
let AddExpenseController = class AddExpenseController {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    async handle(dto) {
        return this.expenseService.createExpense(dto);
    }
};
exports.AddExpenseController = AddExpenseController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof add_expense_dto_1.AddExpenseDto !== "undefined" && add_expense_dto_1.AddExpenseDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AddExpenseController.prototype, "handle", null);
exports.AddExpenseController = AddExpenseController = __decorate([
    (0, common_1.Controller)('expenses'),
    __metadata("design:paramtypes", [typeof (_a = typeof expense_service_1.ExpenseService !== "undefined" && expense_service_1.ExpenseService) === "function" ? _a : Object])
], AddExpenseController);


/***/ }),
/* 33 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddExpenseDto = void 0;
const class_validator_1 = __webpack_require__(23);
const class_transformer_1 = __webpack_require__(15);
const split_type_enum_1 = __webpack_require__(17);
const paid_by_entry_dto_1 = __webpack_require__(34);
const amount_entry_dto_1 = __webpack_require__(35);
class AddExpenseDto {
}
exports.AddExpenseDto = AddExpenseDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddExpenseDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(split_type_enum_1.SplitType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", typeof (_a = typeof split_type_enum_1.SplitType !== "undefined" && split_type_enum_1.SplitType) === "function" ? _a : Object)
], AddExpenseDto.prototype, "split_type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], AddExpenseDto.prototype, "expense", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AddExpenseDto.prototype, "group_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AddExpenseDto.prototype, "created_by", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => paid_by_entry_dto_1.PaidByEntryDto),
    __metadata("design:type", Array)
], AddExpenseDto.prototype, "paid_by", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => amount_entry_dto_1.AmountEntryDto),
    __metadata("design:type", Array)
], AddExpenseDto.prototype, "amounts", void 0);


/***/ }),
/* 34 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaidByEntryDto = void 0;
const class_validator_1 = __webpack_require__(23);
class PaidByEntryDto {
}
exports.PaidByEntryDto = PaidByEntryDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], PaidByEntryDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], PaidByEntryDto.prototype, "amount", void 0);


/***/ }),
/* 35 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AmountEntryDto = void 0;
const class_validator_1 = __webpack_require__(23);
class AmountEntryDto {
}
exports.AmountEntryDto = AmountEntryDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AmountEntryDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], AmountEntryDto.prototype, "amount", void 0);


/***/ }),
/* 36 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetUserExpensesController = void 0;
const common_1 = __webpack_require__(3);
const expense_service_1 = __webpack_require__(29);
let GetUserExpensesController = class GetUserExpensesController {
    constructor(expenseService) {
        this.expenseService = expenseService;
    }
    async handle(user_id) {
        return this.expenseService.getUserExpenses(user_id);
    }
};
exports.GetUserExpensesController = GetUserExpensesController;
__decorate([
    (0, common_1.Get)('user/:user_id'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Param)('user_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GetUserExpensesController.prototype, "handle", null);
exports.GetUserExpensesController = GetUserExpensesController = __decorate([
    (0, common_1.Controller)('expenses'),
    __metadata("design:paramtypes", [typeof (_a = typeof expense_service_1.ExpenseService !== "undefined" && expense_service_1.ExpenseService) === "function" ? _a : Object])
], GetUserExpensesController);


/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettleUpModule = void 0;
const common_1 = __webpack_require__(3);
const settle_up_service_1 = __webpack_require__(38);
const settle_up_user_controller_1 = __webpack_require__(40);
const settle_up_group_controller_1 = __webpack_require__(41);
let SettleUpModule = class SettleUpModule {
};
exports.SettleUpModule = SettleUpModule;
exports.SettleUpModule = SettleUpModule = __decorate([
    (0, common_1.Module)({
        controllers: [settle_up_user_controller_1.SettleUpUserController, settle_up_group_controller_1.SettleUpGroupController],
        providers: [settle_up_service_1.SettleUpService],
    })
], SettleUpModule);


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettleUpService = void 0;
const common_1 = __webpack_require__(3);
const split_entity_1 = __webpack_require__(18);
const user_entity_1 = __webpack_require__(14);
const typeorm_1 = __webpack_require__(12);
const balance_dto_1 = __webpack_require__(39);
let SettleUpService = class SettleUpService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.splitRepo = this.dataSource.getRepository(split_entity_1.SplitEntity);
        this.userRepo = this.dataSource.getRepository(user_entity_1.UserEntity);
    }
    async settleUpUser(userId) {
        const splits = await this.splitRepo.find({
            relations: ['user', 'expense', 'expense.created_by'],
        });
        const filtered = splits.filter((s) => s.user.id === userId || s.expense.created_by.id === userId);
        return this.getTransactionsToSettle(filtered);
    }
    async settleUpGroup(groupId) {
        const splits = await this.splitRepo.find({
            where: {
                expense: {
                    group: {
                        id: groupId,
                    },
                },
            },
            relations: ['user', 'expense', 'expense.group'],
        });
        return this.getTransactionsToSettle(splits);
    }
    async getTransactionsToSettle(splits) {
        const netMap = this.buildNetMap(splits);
        const { debtors, creditors } = this.separateDebtorsAndCreditors(netMap);
        debtors.sort((a, b) => a.amount - b.amount);
        creditors.sort((a, b) => b.amount - a.amount);
        return this.matchDebtorsToCreditors(debtors, creditors);
    }
    async matchDebtorsToCreditors(debtors, creditors) {
        const allUserIds = [
            ...debtors.map((d) => d.user_id),
            ...creditors.map((c) => c.user_id),
        ];
        const users = await this.userRepo.find({ where: { id: (0, typeorm_1.In)(allUserIds) } });
        const userMap = new Map(users.map((u) => [u.id, u]));
        const txns = [];
        let i = 0;
        let j = 0;
        while (i < debtors.length && j < creditors.length) {
            const debtor = debtors[i];
            const creditor = creditors[j];
            const settled = Math.min(-debtor.amount, creditor.amount);
            const fromUser = userMap.get(debtor.user_id);
            const toUser = userMap.get(creditor.user_id);
            txns.push(new balance_dto_1.BalanceDto(fromUser, toUser, settled));
            debtor.amount += settled;
            creditor.amount -= settled;
            if (debtor.amount >= 0)
                i++;
            if (creditor.amount <= 0)
                j++;
        }
        return txns;
    }
    separateDebtorsAndCreditors(netMap) {
        const debtors = [];
        const creditors = [];
        for (const [userId, net] of netMap.entries()) {
            if (net < 0)
                debtors.push({ user_id: userId, amount: net });
            else if (net > 0)
                creditors.push({ user_id: userId, amount: net });
        }
        return { debtors, creditors };
    }
    buildNetMap(splits) {
        const netMap = new Map();
        for (const split of splits) {
            const userId = split.user.id;
            const net = split.paid - split.owed;
            netMap.set(userId, (netMap.get(userId) ?? 0) + net);
        }
        return netMap;
    }
};
exports.SettleUpService = SettleUpService;
exports.SettleUpService = SettleUpService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], SettleUpService);


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BalanceDto = void 0;
class BalanceDto {
    constructor(from, to, amount) {
        this.from = from;
        this.to = to;
        this.amount = amount;
    }
}
exports.BalanceDto = BalanceDto;


/***/ }),
/* 40 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettleUpUserController = void 0;
const common_1 = __webpack_require__(3);
const settle_up_service_1 = __webpack_require__(38);
let SettleUpUserController = class SettleUpUserController {
    constructor(settleUpService) {
        this.settleUpService = settleUpService;
    }
    async handle(userId) {
        return this.settleUpService.settleUpUser(userId);
    }
};
exports.SettleUpUserController = SettleUpUserController;
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SettleUpUserController.prototype, "handle", null);
exports.SettleUpUserController = SettleUpUserController = __decorate([
    (0, common_1.Controller)('settle-up'),
    __metadata("design:paramtypes", [typeof (_a = typeof settle_up_service_1.SettleUpService !== "undefined" && settle_up_service_1.SettleUpService) === "function" ? _a : Object])
], SettleUpUserController);


/***/ }),
/* 41 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SettleUpGroupController = void 0;
const common_1 = __webpack_require__(3);
const settle_up_service_1 = __webpack_require__(38);
let SettleUpGroupController = class SettleUpGroupController {
    constructor(settleUpService) {
        this.settleUpService = settleUpService;
    }
    async handle(groupId) {
        return this.settleUpService.settleUpGroup(groupId);
    }
};
exports.SettleUpGroupController = SettleUpGroupController;
__decorate([
    (0, common_1.Get)('group/:groupId'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Param)('groupId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SettleUpGroupController.prototype, "handle", null);
exports.SettleUpGroupController = SettleUpGroupController = __decorate([
    (0, common_1.Controller)('settle-up'),
    __metadata("design:paramtypes", [typeof (_a = typeof settle_up_service_1.SettleUpService !== "undefined" && settle_up_service_1.SettleUpService) === "function" ? _a : Object])
], SettleUpGroupController);


/***/ }),
/* 42 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(43);
const users_module_1 = __webpack_require__(47);
const jwt_1 = __webpack_require__(46);
const config_1 = __webpack_require__(6);
const jwt_config_1 = __webpack_require__(48);
const local_strategy_1 = __webpack_require__(49);
const register_controller_1 = __webpack_require__(52);
const login_controller_1 = __webpack_require__(54);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule.forFeature(jwt_config_1.default)],
                inject: [jwt_config_1.default.KEY],
                useFactory: (config) => config,
            }),
        ],
        controllers: [register_controller_1.RegisterController, login_controller_1.LoginController],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 43 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const common_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(44);
const bcrypt_1 = __webpack_require__(45);
const jwt_1 = __webpack_require__(46);
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const isPasswordMatch = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordMatch) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name,
        };
    }
    login(user) {
        const payload = {
            sub: user.id,
        };
        const accessToken = this.jwtService.sign(payload);
        return {
            access_token: accessToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    async register(data) {
        const hashedPassword = await (0, bcrypt_1.hash)(data.password, 10);
        return this.usersService.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: hashedPassword,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UsersService !== "undefined" && users_service_1.UsersService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], AuthService);


/***/ }),
/* 44 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersService = void 0;
const common_1 = __webpack_require__(3);
const user_entity_1 = __webpack_require__(14);
const typeorm_1 = __webpack_require__(12);
let UsersService = class UsersService {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.userRepo = this.dataSource.getRepository(user_entity_1.UserEntity);
    }
    async findOneByEmail(email) {
        return this.userRepo.findOneBy({ email });
    }
    async findOneById(id) {
        return this.userRepo.findOneBy({ id });
    }
    async create(data) {
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], UsersService);


/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 46 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 47 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UsersModule = void 0;
const common_1 = __webpack_require__(3);
const users_service_1 = __webpack_require__(44);
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        providers: [users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__(6);
exports["default"] = (0, config_1.registerAs)('jwt', () => ({
    secret: process.env.JWT_SECRET,
    signOptions: {
        expiresIn: (process.env.JWT_EXPIRE_IN || '15m'),
    },
}));


/***/ }),
/* 49 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LocalStrategy_1;
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalStrategy = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(50);
const passport_local_1 = __webpack_require__(51);
const auth_service_1 = __webpack_require__(43);
let LocalStrategy = LocalStrategy_1 = class LocalStrategy extends (0, passport_1.PassportStrategy)(passport_local_1.Strategy, 'local') {
    constructor(authService) {
        super({
            usernameField: 'email',
        });
        this.authService = authService;
        this.logger = new common_1.Logger(LocalStrategy_1.name);
    }
    async validate(email, password) {
        this.logger.log(`Validating user ${email}`);
        return this.authService.validateUser(email, password);
    }
};
exports.LocalStrategy = LocalStrategy;
exports.LocalStrategy = LocalStrategy = LocalStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LocalStrategy);


/***/ }),
/* 50 */
/***/ ((module) => {

module.exports = require("@nestjs/passport");

/***/ }),
/* 51 */
/***/ ((module) => {

module.exports = require("passport-local");

/***/ }),
/* 52 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterController = void 0;
const common_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(43);
const register_dto_1 = __webpack_require__(53);
let RegisterController = class RegisterController {
    constructor(authService) {
        this.authService = authService;
    }
    async handle(dto) {
        return this.authService.register(dto);
    }
};
exports.RegisterController = RegisterController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.Version)('1'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof register_dto_1.RegisterDto !== "undefined" && register_dto_1.RegisterDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], RegisterController.prototype, "handle", null);
exports.RegisterController = RegisterController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], RegisterController);


/***/ }),
/* 53 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDto = void 0;
const class_validator_1 = __webpack_require__(23);
class RegisterDto {
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);


/***/ }),
/* 54 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginController = void 0;
const common_1 = __webpack_require__(3);
const auth_service_1 = __webpack_require__(43);
const local_auth_guard_1 = __webpack_require__(55);
let LoginController = class LoginController {
    constructor(authService) {
        this.authService = authService;
    }
    handle(req) {
        return this.authService.login(req.user);
    }
};
exports.LoginController = LoginController;
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.Version)('1'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LoginController.prototype, "handle", null);
exports.LoginController = LoginController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], LoginController);


/***/ }),
/* 55 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LocalAuthGuard = void 0;
const common_1 = __webpack_require__(3);
const passport_1 = __webpack_require__(50);
let LocalAuthGuard = class LocalAuthGuard extends (0, passport_1.AuthGuard)('local') {
};
exports.LocalAuthGuard = LocalAuthGuard;
exports.LocalAuthGuard = LocalAuthGuard = __decorate([
    (0, common_1.Injectable)()
], LocalAuthGuard);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
const app_module_1 = __webpack_require__(2);
const common_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.useGlobalInterceptors(new common_1.ClassSerializerInterceptor(app.get(core_1.Reflector)));
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

})();

/******/ })()
;