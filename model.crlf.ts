/**
 * Created by com.bison.tools.java2ts.Java2TypeScriptModelGenerator, Mon Jul 13 17:18:03 CEST 2015.
 */


module model {

    export enum Currency {
        CHF, EUR
    }

    export interface CustomKey {
        category: KeyCategory;
        defaultValue: string;
        enterpriseOverrides: Set;
        id: string;
        label: string;
        name: string;
    }

    export enum KeyCategory {
        management, application, database
    }

    export interface Set {
    }

    export enum DbType {
        ORACLE_11_G, MSSQL_SERVER_2008, MSSQL_SERVER_2012
    }

    export interface Enterprise {
        bisonMaintUser: string;
        bisonMaintUserPwd: string;
        dbHost: string;
        dbPort: number;
        dbType: DbType;
        ddlPassword: string;
        ddlUser: string;
        description: string;
        diMasterHost: string;
        dmlPassword: string;
        dmlUser: string;
        host: string;
        id: string;
        installPath: string;
        instanceName: string;
        licenseKey: string;
        myCustomKeyValues: Set;
        name: string;
        neighborhoodName: string;
        osType: OsType;
        parameterVersion: string;
        portconfig: number;
        rasHigh: string;
        rasLow: string;
        rasNormal: string;
        release: string;
        site: Site;
        sshPort: number;
        sshUser: string;
        state: EnterpriseState;
        tenants: Set;
        xmldbPassword: string;
        xmldbPath: string;
        xmldbUser: string;
    }

    export enum OsFamily {
        UNIX, WINDOWS
    }

    export interface Site {
        description: string;
        enterprises: Collection;
        id: string;
        name: string;
        release: string;
    }

    export interface Collection {
    }

    export enum EnterpriseState {
        initial, deploying, deployed
    }

    export interface EnterpriseKeyValue {
        customKey: CustomKey;
        enterprise: Enterprise;
        id: EnterpriseKeyValueId;
        keyValue: string;
    }

    export interface EnterpriseKeyValueId {
        customKeyId: string;
        enterpriseId: string;
    }

    export interface EnumProperty {
        text: string;
        value: string;
    }

    export interface Principal {
        emsLogin: boolean;
        id: string;
        principal: string;
        tenants: Set;
    }

    export enum ReferenceModel {
        Standard, AFB, AMK, BM1000, BM2000, BM2100, BM3000, BM4000, BM5000, DRWZ, Gero, KSG, RAgr, RFen, RGof, RLap, RLch, RLdi, RUfa, TGH, TSH, TWS
    }

    export interface Tenant {
        currency: Currency;
        description: string;
        enterprise: Enterprise;
        id: string;
        ident: string;
        name: string;
        principals: Set;
        refmodel: ReferenceModel;
    }

    export interface Job {
        args: string;
        description: string;
        enterprise: Enterprise;
        id: string;
        isSelfReferencing: boolean;
        jobSequence: number;
        jobType: JobType;
        parent: Job;
        schedule: JobSchedule;
        sourceEnterprise: Enterprise;
        subJobs: Set;
    }

    export enum JobType {
        startEnterprise, stopEnterprise, restartEnterprise, deployEnterprise, installEnterprise, startInstallEnterprise, finishInstallEnterprise, updateEnterprise, runUpdateEnterprise, startUpdateEnterprise, finishUpdateEnterprise, executeRuleImport, importMasterData, cloneToExistingEnterprise, cloneEnterprise, startCloneEnterprise, transferSchema, createCopyOfXMLDB, transferXMLDB, deleteCopyOfXMLDB, installEnterpriseNoData, finishCloneEnterprise, undeployEnterprise, uninstallEnterprise, generateBusinessTypes, createDBTableSpace, createDBUser, deleteDBTableSpace, deleteDBUser, deleteXMLDBDirectory, finishUninstallEnterprise, startBison, startXMLDB, startSourceXMLDB, stopBison, stopXMLDB, stopSourceXMLDB, transferUser, maintenanceModeOn, maintenanceModeOff, rebuildCmpDep, generateODB, lockDBStatistic, unlockDBStatistic
    }

    export interface JobSchedule {
        dayOfMonth: string;
        dayOfWeek: string;
        endDate: Date;
        hour: string;
        id: string;
        minute: string;
        month: string;
        scheduleDate: Date;
        scheduleType: ScheduleType;
        second: string;
        startDate: Date;
        timeZone: string;
        year: string;
    }

    export enum ScheduleType {
        immediate, scheduled, cron
    }

    export interface JobRun {
        endDate: Date;
        id: string;
        info: string;
        job: Job;
        jobState: JobState;
        remoteProcessId: number;
        startDate: Date;
    }

    export enum JobState {
        running, successful, failed
    }

    export interface JobRunProgress {
        endDate: Date;
        id: string;
        jobRun: JobRun;
        state: JobRunProgressState;
        step: string;
        stepInfo: string;
    }

    export enum JobRunProgressState {
        running, success, warning, failed
    }

    export function JobTransformer(obj: Job): void {
        if (!obj) { return; }
        JobTransformer(obj.parent);
        JobScheduleTransformer(obj.schedule);
    }

    export function JobScheduleTransformer(obj: JobSchedule): void {
        if (!obj) { return; }
        transformNumberToDate(obj, ['endDate', 'scheduleDate', 'startDate']);
    }

    export function JobRunTransformer(obj: JobRun): void {
        if (!obj) { return; }
        transformNumberToDate(obj, ['endDate', 'startDate']);
        JobTransformer(obj.job);
    }

    export function JobRunProgressTransformer(obj: JobRunProgress): void {
        if (!obj) { return; }
        transformNumberToDate(obj, ['endDate']);
        JobRunTransformer(obj.jobRun);
    }

    function transformNumberToDate(obj: any, fields: string[]): void {
        fields.forEach(it => {
            var num = obj[it];
            if (typeof num === 'number') {
                obj[it] = new Date(num);
            }
        });
    }
}
