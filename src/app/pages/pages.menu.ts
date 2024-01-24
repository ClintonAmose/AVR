export const PAGES_MENU = [
    {
        path: 'pages',
        children: [
            {
                path: 'dashboard',
                data: {
                    menu: {
                        title: 'general.menu.dashboard',
                        icon: 'ion-android-home',
                        selected: false,
                        expanded: true,
                        order: 0
                    }
                }
            },
            {
                path: 'master',
                data: {
                    menu: {
                        title: 'general.menu.master',
                        icon: 'fa fa-medium',
                        selected: false,
                        expanded: false,
                        order: 100,
                    }
                },
                children: [
                    {
                        path: 'adminuser',
                        data: {
                            menu: {
                                title: 'general.menu.adminuser',
                            }
                        }
                    },
                   /*   {
                        path: 'branch',
                        data: {
                            menu: {
                                title: 'general.menu.branch',
                            }
                        }
                    },  */
					{
                        path: 'customer',
                        data: {
                            menu: {
                                title: 'general.menu.customer',
                            }
                        }
                    },
					{
                        path: 'dealer',
                        data: {
                            menu: {
                                title: 'general.menu.dealer',
                            }
                        }
                    },
                    /* {
                       path: 'carat',
                       data: {
                         menu: {
                           title: 'general.menu.carat',
                         }
                       }
                     },*/
                    {
                        path: 'catalogstyle',
                        data: {
                            menu: {
                                title: 'general.menu.catalogstyle',
                            }
                        }
                    },
                    {
                        path: 'collection',
                        data: {
                            menu: {
                                title: 'general.menu.collection',
                            }
                        }
                    },
                    /* {
                        path: 'clarity',
                        data: {
                            menu: {
                                title: 'general.menu.clarity',
                            }
                        }
                    }, */
                    /*{
                      path: 'color',
                      data: {
                        menu: {
                          title: 'general.menu.color',
                        }
                      }
                    },*/
                    /* {
                        path: 'department',
                        data: {
                            menu: {
                                title: 'general.menu.department',
                            }
                        }
                    },
                    {
                        path: 'designation',
                        data: {
                            menu: {
                                title: 'general.menu.designation',
                            }
                        }
                    }, */
                    /*{
                        path: 'categoryhead',
                        data: {
                            menu: {
                                title: 'general.menu.categoryhead',
                            }
                        }
                    },*/
                    {
                        path: 'category',
                        data: {
                            menu: {
                                title: 'general.menu.category',
                            }
                        }
                    },
                    {
                        path: 'subcategory',
                        data: {
                            menu: {
                                title: 'general.menu.subcategory',
                            }
                        }
                    },
                    {
                        path: 'item',
                        data: {
                            menu: {
                                title: 'general.menu.item',
                            }
                        }
                    },
                    /*{
                    path: 'stone',
                    data: {
                      menu: {
                        title: 'general.menu.stone',
                      }
                    }
                  },
                  {
                    path: 'stoneshape',
                    data: {
                      menu: {
                        title: 'general.menu.stoneshape',
                      }
                    }
                  },
                  {
                    path: 'metal',
                    data: {
                      menu: {
                        title: 'general.menu.metal',
                      }
                    }
                  },
                    {
                        path: 'material',
                        data: {
                            menu: {
                                title: 'general.menu.material',
                            }
                        }
                    },*/
                   /*  {
                        path: 'profile',
                        data: {
                            menu: {
                                title: 'general.menu.profile',
                            }
                        }
                    }, */
                    {
                        path: 'die',
                        data: {
                            menu: {
                                title: 'general.menu.die',
                            }
                        }
                    },
                    {
                        path: 'design',
                        data: {
                            menu: {
                                title: 'general.menu.design',
                            }
                        }
                    },
                    /*{
                        path: 'product',
                        data: {
                            menu: {
                                title: 'general.menu.product',
                            }
                        }
                    },*/
                    {
                        path: 'purity',
                        data: {
                            menu: {
                                title: 'general.menu.purity',
                            }
                        }
                    },
                    /* {
                        path: 'size',
                        data: {
                            menu: {
                                title: 'general.menu.size',
                            }
                        }
                    }, */
                     {
                        path: 'theme',
                        data: {
                            menu: {
                                title: 'general.menu.theme',
                            }
                        }
                    },
                   /* {
                        path: 'employee',
                        data: {
                            menu: {
                                title: 'general.menu.employee',
                            }
                        }
                    },
					 {
                      path: 'rate',
                      data: {
                        menu: {
                          title: 'general.menu.rate',
                        }
                      }
                    },
					 {
                        path: 'stonerate',
                        data: {
                            menu: {
                                title: 'general.menu.stonerate',
                            }
                        }
                    } */
                    /*{
                      path: 'uom',
                      data: {
                        menu: {
                          title: 'general.menu.uom',
                        }
                      }
                    }*/
                ]
            },
            {
                path: 'vendor',
                data: {
                    menu: {
                        title: 'general.menu.karigar',
                        icon: 'ion-settings',
                        selected: false,
                        expanded: false,
                        order: 100,
                    }
                },
                children: [
                    {
                        path: 'vendorlist',
                        data: {
                            menu: {
                                title: 'general.menu.karigarlist',
                            }
                        }
                    },
                    {
                        path: 'joborder',
                        data: {
                            menu: {
                                title: 'general.menu.joborder',
                            }
                        }
                    },
                    /* {
                        path: 'metalissue',
                        data: {
                            menu: {
                                title: 'general.menu.metalissue',
                            }
                        }
                    } */
                ]
            },
            {
                path: 'orderprocess',
                data: {
                    menu: {
                        title: 'general.menu.orderprocess',
                        icon: 'ion-person-add',
                        selected: false,
                        expanded: false,
                        order: 250,
                    }
                },
                children: [
                    {
                        path: 'customerorder',
                        data: {
                            menu: {
                                title: 'general.menu.customerorder',
                            }
                        }
                    },
                    {
                        path: 'customerdelivery',
                        data: {
                            menu: {
                                title: 'general.menu.customerdelivery',
                            }
                        }
                    },
                    {
                        path: 'orderclose',
                        data: {
                            menu: {
                                title: 'general.menu.orderclose',
                            }
                        }
                    }
                ]
            },
            {
                path: 'reports',
                data: {
                    menu: {
                        title: 'general.menu.reports',
                        icon: 'ion-stats-bars',
                        selected: false,
                        expanded: false,
                        order: 200,
                    }
                },
                children: [
                    {
                        path: 'corderstatus',
                        data: {
                            menu: {
                                title: 'general.menu.corderstatus',
                            }
                        }
                    },
                    {
                        path: 'vorderstatus',
                        data: {
                            menu: {
                                title: 'general.menu.vorderstatus',
                            }
                        }
                    },
                   /*  {
                        path: 'passbook',
                        data: {
                            menu: {
                                title: 'general.menu.passbook',
                            }
                        }
                    }, */
                    {
                        path: 'deliveryreports',
                        data: {
                            menu: {
                                title: 'general.menu.deliveryreports',
                            }
                        }
                    },
                    {
                        path: 'diereport',
                        data: {
                            menu: {
                                title: 'general.menu.diereport',
                            }
                        }
                    }
                ]
            },
            /* {
                path: 'settings',
                data: {
                    menu: {
                        title: 'general.menu.settings',
                        icon: 'ion-gear-b',
                        selected: false,
                        expanded: false,
                        order: 350
                    }
                }
            }, */
           /* {
                path: 'settings',
                data: {
                    menu: {
                        title: 'general.menu.settings',
                        icon: 'ion-gear-b',
                        selected: false,
                        expanded: false,
                        order: 300,
                    }
                },
                children: [
					 {
						path: 'company',
						data: {
							menu: {
								title: 'general.menu.company',
								order: 1
							}
						}
					}, 
                   {
                      path: 'buttons',
                      data: {
                        menu: {
                          title: 'general.menu.buttons',
                        }
                      }
                    },
                    {
                      path: 'icons',
                      data: {
                        menu: {
                          title: 'general.menu.icons',
                        }
                      }
                    },
                    {
                      path: 'modals',
                      data: {
                        menu: {
                          title: 'general.menu.modals',
                        }
                      }
                    },
                    {
                      path: 'slim',
                      data: {
                        menu: {
                          title: 'Slim loading bar',
                        }
                      }
                    },
                    {
                      path: 'grid',
                      data: {
                        menu: {
                          title: 'general.menu.grid',
                        }
                      }
                    },
                ]
            },*/
            /* {
               path: 'forms',
               data: {
                 menu: {
                   title: 'general.menu.form_elements',
                   icon: 'ion-compose',
                   selected: false,
                   expanded: false,
                   order: 400,
                 }
               },
               children: [
                 {
                   path: 'inputs',
                   data: {
                     menu: {
                       title: 'general.menu.form_inputs',
                     }
                   }
                 },
                 {
                   path: 'layouts',
                   data: {
                     menu: {
                       title: 'general.menu.form_layouts',
                     }
                   }
                 }
               ]
             },
             {
               path: 'tables',
               data: {
                 menu: {
                   title: 'general.menu.tables',
                   icon: 'ion-grid',
                   selected: false,
                   expanded: false,
                   order: 500,
                 }
               },
               children: [
                 {
                   path: 'basictables',
                   data: {
                     menu: {
                       title: 'general.menu.basic_tables',
                     }
                   }
                 },
                 {
                   path: 'smarttables',
                   data: {
                     menu: {
                       title: 'general.menu.smart_tables',
                     }
                   }
                 },
                 {
                   path: 'datatables',
                   data: {
                     menu: {
                       title: 'Data Tables',
                     }
                   }
                 },
                  {
                    path: 'hottables',
                    data: {
                      menu: {
                        title: 'Hot Tables',
                      }
                    }
                  }
               ]
             },
             {
               path: 'maps',
               data: {
                 menu: {
                   title: 'general.menu.maps',
                   icon: 'ion-ios-location-outline',
                   selected: false,
                   expanded: false,
                   order: 600,
                 }
               },
               children: [
                 {
                   path: 'googlemaps',
                   data: {
                     menu: {
                       title: 'general.menu.google_maps',
                     }
                   }
                 },
                 {
                   path: 'leafletmaps',
                   data: {
                     menu: {
                       title: 'general.menu.leaflet_maps',
                     }
                   }
                 },
                 {
                   path: 'bubblemaps',
                   data: {
                     menu: {
                       title: 'general.menu.bubble_maps',
                     }
                   }
                 },
                 {
                   path: 'linemaps',
                   data: {
                     menu: {
                       title: 'general.menu.line_maps',
                     }
                   }
                 }
               ]
             },
             {
               path: '',
               data: {
                 menu: {
                   title: 'general.menu.pages',
                   icon: 'ion-document',
                   selected: false,
                   expanded: false,
                   order: 650,
                 }
               },
               children: [
                 {
                   path: ['/login'],
                   data: {
                     menu: {
                       title: 'general.menu.login'
                     }
                   }
                 },
                 {
                   path: ['/register'],
                   data: {
                     menu: {
                       title: 'general.menu.register'
                     }
                   }
                 }
               ]
             },
             {
               path: '',
               data: {
                 menu: {
                   title: 'general.menu.menu_level_1',
                   icon: 'ion-ios-more',
                   selected: false,
                   expanded: false,
                   order: 700,
                 }
               },
               children: [
                 {
                   path: '',
                   data: {
                     menu: {
                       title: 'general.menu.menu_level_1_1',
                       url: '#'
                     }
                   }
                 },
                 {
                   path: '',
                   data: {
                     menu: {
                       title: 'general.menu.menu_level_1_2',
                       url: '#'
                     }
                   },
                   children: [
                     {
                       path: '',
                       data: {
                         menu: {
                           title: 'general.menu.menu_level_1_2_1',
                           url: '#'
                         }
                       }
                     }
                   ]
                 }
               ]
             },*/
            /* {
                path: '',
                data: {
                    menu: {
                        title: 'general.menu.external_link',
                        url: 'http://logimaxindia.com',
                        icon: 'ion-android-exit',
                        order: 800,
                        target: '_blank'
                    }
                }
            } */
        ]
    }
];
