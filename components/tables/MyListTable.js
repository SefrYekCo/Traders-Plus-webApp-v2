import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import styles from "./myListTable.module.css";
import Image from 'next/image';

import { numberWithCommas } from '../../helpers/helperFunctions';

export default function MyListTable({data ,theme ,type}) {

  const columns = [
    { field: 'icon', headerName: 'لوگو', flex: .5 , align :"center",headerAlign:'center' ,renderCell: (id) => {
        
      return (
       id.row.icon && <Image width={30} height={30} src={ id.row.icon} />
      );
    } },
    { field: 'name', headerName: 'نام', flex: .5, align :"left",headerAlign:'left' },
    { field: 'symbol', headerName: 'نماد',  flex: .5 , align :"left",headerAlign:'left' },
    {
      field: 'price',
      headerName: 'آخرین قیمت',
      flex: .5,
      align :"left",
      headerAlign:'left'
    },
    {
      field: 'change_percent_24h',
      headerName: 'درصد تغییرات',
      align :"left",
      dir:"left",
      headerAlign:'left' ,
      flex: .5,

    },
      { field: 'market_cap', headerName: 'Market Cap',  flex: .5 , align :"left",headerAlign:'left',
      renderCell: (id) => {
        return (
          id.row.market_cap &&  <p> {numberWithCommas(id.row.market_cap)} </p>
        );
      } 
    },
  ];

  const currenciesOrMetalsColumn = [
   
    { field: 'name', headerName: 'نام', flex: .5, align :"left",headerAlign:'left' },
    { field: 'slug', headerName: 'نماد',  flex: .5 , align :"left",headerAlign:'left' },
    {
      field: 'price',
      headerName: 'آخرین قیمت',
      flex: .5,
      align :"left",
      headerAlign:'left',
      renderCell: (id) => {
        return (
          id.row.price &&  <p> {numberWithCommas(id.row.price)}</p>
        );
      }
    },
    {
      field: 'change_percent',
      headerName: 'درصد تغییرات',
      align :"left",
      dir:"left",
      headerAlign:'left' ,
      flex: .5,

    },
      { field: 'max_price', headerName: 'بالاترین قیمت',  flex: .5 , align :"left",headerAlign:'left' ,
        renderCell: (id) => {
        return (
          id.row.max_price &&  <p> {numberWithCommas(id.row.max_price)} ریال</p>
        );
      }
    },
      { field: 'min_price', headerName: 'پایین ترین قیمت',  flex: .5 , align :"left",headerAlign:'left' ,
      renderCell: (id) => {
        return (
          id.row.min_price &&  <p> {numberWithCommas(id.row.min_price)} ریال</p>
        );
      }
      },
  ]



  return (
    <div className={styles.mainContainer}>
      <DataGrid
      sx={ theme ? {
        width:"100%",
        minWidth:"800px",
       
        "& .MuiDataGrid-cellContent":{
          color:"#2A2E39",
          direction:'ltr'
        },

        "& 	.MuiDataGrid-columnHeader":{
          color:"#2A2E39",
          backgroundColor:"#F4F6FA",

        },

        "& 	.MuiDataGrid-columnSeparator":{
          display:"none"
        },

        "& 	.MuiDataGrid-row":{
          border:"none !important",
      
        },

        '&>.MuiDataGrid-main': { 
          '& div div div div >.MuiDataGrid-cell': {
            borderBottom: 'none',
          },
        }
      }:
      {
        width:"100%",
        minWidth:"800px",
        border:"none",

        "& .MuiDataGrid-cellContent":{
          color:"#fff"
        },

        "& 	.MuiDataGrid-columnHeader":{
          color:"#fff",
        },

        "& 	.MuiDataGrid-row":{
          border:"none !important",
        },
        
        "& 	.MuiDataGrid-columnSeparator":{
          display:"none"
        },

        '&>.MuiDataGrid-main': {
          '& div div div div >.MuiDataGrid-cell': {
            borderBottom: 'none',
          },
        }
        
      }
    }
        rows={data}
        columns={type.cryptos ? columns : currenciesOrMetalsColumn}
        pagination={false}
        components={{
          Footer: () => <div></div>,
      }}
      disableColumnMenu
        className={theme ? styles.table : styles.tableDark}
      />
    </div>
  );
}
