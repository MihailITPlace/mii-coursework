import React, {useEffect} from 'react';
import {Document, Font, Image, Link, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
import {Regions, UserInfo} from "../service/Models";
import {DataTableCell, Table, TableBody, TableCell, TableHeader} from "@david.kucsai/react-pdf-table";
import ErrorWrapper from "./ErrorWrapper";

interface ReportProps {
    regionsChart: string,
    postsChart: string,
    user: UserInfo,
    regions: Regions
}

type RegionsMapped = {
    name: string,
    count: number
}

const styles = StyleSheet.create({
    page: {
        // fontFamily: 'OpenSans',
        fontSize: 15
    },
    section: {
        margin: 10,
        padding: 10,
    },
    text: {
        fontSize: 12
    },
    table: {
        margin: 10
    }
});

const Report = ({regionsChart, postsChart, user, regions}: ReportProps) => {
    useEffect(() => {

    }, []);

    const mapRegions = (): RegionsMapped[] => {
        return Object.keys(regions).map(k => {
            return {name: k, count: regions[k]}
        }).sort((a: RegionsMapped, b: RegionsMapped): number => {
            if (a.count > b.count) return -1;
            if (a.count < b.count) return 1;
            return 0;
        })
    };

    return (
        user ?
            <ErrorWrapper>
                <Document>
                    <Page size="A4" style={{ ...styles.page, fontFamily: 'OpenSans' }}>
                        <View style={styles.section}>
                            <Text>Информация о пользователе:</Text>
                            <Text style={styles.text}>
                                Никнейм: <Link src={`https://instagram.com/${user.username}`}>{user.username}</Link>
                            </Text>
                            <Text style={styles.text}>
                                Внешняя ссылка
                                <Link src={user.external_url}>{' ' + (user.external_url || ' отсутствует')}</Link>
                            </Text>
                            <Text style={styles.text}>Телефон: {user.public_contact_phone_number || ' не указан'}</Text>
                            <Text style={styles.text}>Почта: {user.public_email || ' не указана'}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text>Количество публикаций:</Text>
                            <Text style={styles.text}>{user.media.length}</Text>
                        </View>
                    </Page>
                    <Page size="A4" style={{ ...styles.page, fontFamily: 'OpenSans', padding: 10 }}>
                        <Table
                            data={mapRegions()}
                        >
                            <TableHeader textAlign={"center"}>
                                <TableCell weighting={0.4}>
                                    Город
                                </TableCell>
                                <TableCell weighting={0.2}>
                                    Количество публикаций
                                </TableCell>
                            </TableHeader>
                            <TableBody>
                                <DataTableCell weighting={0.4} getContent={(r: RegionsMapped) => r.name}/>
                                <DataTableCell weighting={0.2} getContent={(r: RegionsMapped) => r.count}/>
                            </TableBody>
                        </Table>
                    </Page>
                </Document>
            </ErrorWrapper> : null
    )
};

export default Report;