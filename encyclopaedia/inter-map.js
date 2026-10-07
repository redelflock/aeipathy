<script>
function initialiseMap() {

    const mapBox = document.getElementById('map_box');

    const highlightLayers =
        document.querySelectorAll('.highlight_layer');

    const realmPolys =
        document.getElementById('realm_polys');


    /* =====================================================
       POLYGON GROUPS
       ===================================================== */

    const polygonGroups = {

        realm: document.getElementById('realm_polys'),

        aegeas: document.getElementById('aegeas_polys'),
        europa: document.getElementById('europa_polys'),
        ostjord: document.getElementById('ostjord_polys'),
        sahra: document.getElementById('sahra_polys'),
        sharqaan: document.getElementById('sharqaan_polys'),

        hattusa: document.getElementById('hattusa_polys'),
        hellas: document.getElementById('hellas_polys'),

        athenia: document.getElementById('athenia_polys'),
        colchis: document.getElementById('colchis_polys'),
        taengea: document.getElementById('taengea_polys'),

        romawest: document.getElementById('romawest_polys'),
        romaeast: document.getElementById('romaeast_polys'),
        romaisles: document.getElementById('romaisles_polys'),
        romamain: document.getElementById('romamain_polys'),

        osthoj: document.getElementById('osthoj_polys'),
        valland: document.getElementById('valland_polys'),

        bedoamt: document.getElementById('bedoamt_polys'),
        kmt: document.getElementById('kmt_polys'),

        assyria: document.getElementById('assyria_polys'),
        babylonia: document.getElementById('babylonia_polys'),
        phoenicia: document.getElementById('phoenicia_polys')

    };


    /* =====================================================
       HIERARCHY
       ===================================================== */

    const hierarchy = {

        /* REALMS → LEVEL 2 */

        aegeas: 'aegeas_polys',

        europa1: 'europa_polys',
        europa2: 'europa_polys',
        europa3: 'europa_polys',
        europa4: 'europa_polys',

        ostjord: 'ostjord_polys',

        sahra: 'sahra_polys',

        sharqaan: 'sharqaan_polys',


        /* AEGEAS → LEVEL 3 */

        hattusa: 'hattusa_polys',
        hellas: 'hellas_polys',


        /* HELLAS → LEVEL 4 */

        athenia: 'athenia_polys',
        colchis: 'colchis_polys',
        taengea: 'taengea_polys',


        /* EUROPA → LEVEL 3 */

        romawest: 'romawest_polys',
        romaeast: 'romaeast_polys',
        romaisles: 'romaisles_polys',
        romamain: 'romamain_polys',


        /* OSTJORD → LEVEL 3 */

        osthoj: 'osthoj_polys',
        valland: 'valland_polys',


        /* SAHRA → LEVEL 3 */

        bedoamt: 'bedoamt_polys',
        kmt: 'kmt_polys',


        /* SHARQAAN → LEVEL 3 */

        assyria: 'assyria_polys',
        babylonia: 'babylonia_polys',
        phoenicia: 'phoenicia_polys'

    };


    /* =====================================================
       CHILD → PARENT RELATIONSHIP
       ===================================================== */

    const parentGroups = {

        hattusa: 'aegeas_polys',
        hellas: 'aegeas_polys',

        athenia: 'hellas_polys',
        colchis: 'hellas_polys',
        taengea: 'hellas_polys',

        romawest: 'europa_polys',
        romaeast: 'europa_polys',
        romaisles: 'europa_polys',
        romamain: 'romamain_polys',

        osthoj: 'ostjord_polys',
        valland: 'ostjord_polys',

        bedoamt: 'sahra_polys',
        kmt: 'sahra_polys',

        assyria: 'sharqaan_polys',
        babylonia: 'sharqaan_polys',
        phoenicia: 'sharqaan_polys'

    };


    /* =====================================================
       HIDE ALL POLYGON GROUPS
       ===================================================== */

    function hideAllPolygonGroups() {

        Object.keys(polygonGroups).forEach(function (key) {

            const group = polygonGroups[key];

            if (group) {
                group.style.display = 'none';
            }

        });

    }


    /* =====================================================
       SHOW GROUP
       ===================================================== */

    function showGroup(groupId) {

        const group =
            document.getElementById(groupId);

        if (group) {

            group.style.display = 'block';

            group.style.pointerEvents = 'auto';

            console.log(
                'Showing polygon group:',
                groupId
            );

        }

    }


    /* =====================================================
       HIGHLIGHTS
       ===================================================== */

    function hideAllHighlights() {

        highlightLayers.forEach(function (layer) {

            layer.classList.remove('visible');

        });

    }


    /* =====================================================
       GET POLYGON ID
       ===================================================== */

    function getPolygonId(poly) {

        return poly.getAttribute('id');

    }


    /* =====================================================
       ADD EVENTS TO POLYGON
       ===================================================== */

    function attachPolygonEvents(poly) {

        const id =
            getPolygonId(poly);

        if (!id) return;


        const highlight =
            document.getElementById(
                'highlight_' + id
            );


        /* -----------------------------------------------
           HOVER
           ----------------------------------------------- */

        poly.addEventListener(
            'mouseenter',
            function () {

                if (highlight) {

                    highlight.classList.add(
                        'visible'
                    );

                }

            }
        );


        poly.addEventListener(
            'mouseleave',
            function () {

                if (highlight) {

                    highlight.classList.remove(
                        'visible'
                    );

                }

            }
        );


        /* -----------------------------------------------
           CLICK
           ----------------------------------------------- */

        poly.addEventListener(
            'click',
            function (e) {

                /* ---------------------------------------
                   CHECK FOR A LINK WRAPPING THIS POLYGON
                   --------------------------------------- */

                const link =
                    poly.closest('a[href]');

                if (link) {

                    e.preventDefault();

                    window.location.href =
                        link.getAttribute('href');

                    return;

                }


                console.log(
                    'Clicked:',
                    id
                );


                /* ---------------------------------------
                   HIGHLIGHT
                   --------------------------------------- */

                if (highlight) {

                    hideAllHighlights();

                    highlight.classList.add(
                        'visible'
                    );

                }


                /* ---------------------------------------
                   DETERMINE CHILD GROUP
                   --------------------------------------- */

                const childGroupId =
                    hierarchy[id];


                /* ---------------------------------------
                   EUROPA REALM
                   --------------------------------------- */

                if (
                    id === 'europa1' ||
                    id === 'europa2' ||
                    id === 'europa3' ||
                    id === 'europa4'
                ) {

                    saveMapState(id);

                    mapBox.className =
                        id + ' realm';

                    hideAllPolygonGroups();

                    showGroup(
                        'europa_polys'
                    );

                    return;
                }


                /* ---------------------------------------
                   NORMAL REALM → LEVEL 2
                   --------------------------------------- */

                if (
                    id === 'aegeas' ||
                    id === 'ostjord' ||
                    id === 'sahra' ||
                    id === 'sharqaan'
                ) {

                    saveMapState(id);

                    mapBox.className =
                        id + ' realm';

                    hideAllPolygonGroups();

                    if (childGroupId) {

                        showGroup(
                            childGroupId
                        );

                    }

                    return;
                }


                /* ---------------------------------------
                   LEVEL 2 → LEVEL 3
                   --------------------------------------- */

                if (childGroupId) {

                    saveMapState(id);

                    mapBox.className =
                        id + ' subrealm';

                    hideAllPolygonGroups();

                    showGroup(
                        childGroupId
                    );

                    console.log(
                        'Showing child group:',
                        childGroupId
                    );

                    return;
                }


                /* ---------------------------------------
                   LEVEL 3 POLYGON
                   --------------------------------------- */

                mapBox.classList.add(
                    'subsubrealm'
                );

            }
        );

    }


    /* =====================================================
       ATTACH EVENTS TO ALL POLYGONS
       ===================================================== */

    document
        .querySelectorAll(
            'svg polygon'
        )
        .forEach(function (poly) {

            attachPolygonEvents(poly);

        });


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    hideAllPolygonGroups();

    realmPolys.style.display =
        'block';

    realmPolys.style.pointerEvents =
        'auto';


    /* =====================================================
       NAVIGATION TREE
       ===================================================== */

    const persistentNav = new Set();


    /* =====================================================
       MAP HISTORY
       ===================================================== */

    const mapHistory = [];


    /* -----------------------------------------------
       SAVE CURRENT MAP STATE
       ----------------------------------------------- */

    function saveMapState(clickedId) {

        const visibleGroups = [];

        Object.keys(polygonGroups).forEach(function (key) {

            const group = polygonGroups[key];

            if (
                group &&
                window.getComputedStyle(group).display !== 'none'
            ) {

                visibleGroups.push(group.id);

            }

        });


        mapHistory.push({

            mapBoxClass:
                mapBox.className,

            visibleGroups:
                visibleGroups,

            clickedId:
                clickedId

        });


        console.log(
            'Saved map state:',
            mapHistory[mapHistory.length - 1]
        );

    }


    /* -----------------------------------------------
       RESTORE PREVIOUS MAP STATE
       ----------------------------------------------- */

    function restorePreviousMapState() {

        if (!mapHistory.length) {

            return;

        }


        const previousState =
            mapHistory.pop();


        /* -------------------------------------------
           RESTORE MAP CLASS
           ------------------------------------------- */

        mapBox.className =
            previousState.mapBoxClass;


        /* -------------------------------------------
           RESTORE POLYGON GROUPS
           ------------------------------------------- */

        hideAllPolygonGroups();


        previousState.visibleGroups.forEach(
            function (groupId) {

                showGroup(groupId);

            }
        );


        /* -------------------------------------------
           REMOVE THE NAVIGATION ITEM THAT
           REPRESENTED THE LEVEL WE JUST LEFT
           ------------------------------------------- */

        if (previousState.clickedId) {

            persistentNav.delete(
                previousState.clickedId
            );

        }


        /* -------------------------------------------
           HIDE NAV ITEMS THAT ARE NO LONGER
           PART OF THE CURRENT NAVIGATION PATH
           ------------------------------------------- */

        document
            .querySelectorAll('.map_nav .mn')
            .forEach(function (item) {

                if (
                    item.classList.contains(
                        'mn_buffer'
                    )
                ) {

                    return;

                }


                const classes =
                    Array.from(
                        item.classList
                    );


                const navId =
                    classes.find(function (className) {

                        return className.indexOf(
                            'mn_'
                        ) === 0 &&
                        className !== 'mn_buffer';

                    });


                if (!navId) {

                    return;

                }


                const id =
                    navId.substring(3);


                if (
                    persistentNav.has(id)
                ) {

                    item.style.display =
                        'inline-block';

                } else {

                    item.style.display =
                        'none';

                }

            });


        hideAllHighlights();


        console.log(
            'Restored previous map state:',
            previousState
        );

    }


    /* -----------------------------------------------
       GET NAVIGATION ITEM
       ----------------------------------------------- */

    function getNavItem(id) {

        const items =
            document.getElementsByClassName(
                'mn_' + id
            );

        return items.length
            ? items[0]
            : null;

    }


    /* -----------------------------------------------
       GET MAP CONTENT BOX
       ----------------------------------------------- */

    function getMapContentItem(id) {

        return document.getElementById(
            'mct_' + id
        );

    }


    /* -----------------------------------------------
       SHOW NAVIGATION ITEM
       ----------------------------------------------- */

    function showNavItem(id) {

        const item =
            getNavItem(id);

        if (item) {

            item.style.display =
                'inline-block';

        }

    }


    /* -----------------------------------------------
       HIDE NAVIGATION ITEM
       ----------------------------------------------- */

    function hideNavItem(id) {

        const item =
            getNavItem(id);

        if (
            item &&
            !persistentNav.has(id)
        ) {

            item.style.display =
                'none';

        }

    }


    /* -----------------------------------------------
       SHOW MAP CONTENT
       ----------------------------------------------- */

    function showMapContent(id) {

        const content =
            getMapContentItem(id);

        if (content) {

            content.style.setProperty(
                'display',
                'inline-block',
                'important'
            );

        }

    }


    /* -----------------------------------------------
       HIDE MAP CONTENT
       ----------------------------------------------- */

    function hideMapContent(id) {

        console.log(
            'HIDEMAPCONTENT CALLED FOR:',
            id
        );

        console.trace();

        const content =
            getMapContentItem(id);

        if (content) {

            content.style.setProperty(
                'display',
                'none',
                'important'
            );

        }

    }


    /* -----------------------------------------------
       CLEAR NAVIGATION + CONTENT
       ----------------------------------------------- */

    function clearNavigation() {

        persistentNav.clear();

        mapHistory.length = 0;


        /* Hide navigation items */

        document
            .querySelectorAll('.map_nav .mn')
            .forEach(function (item) {

                if (
                    !item.classList.contains(
                        'mn_buffer'
                    )
                ) {

                    item.style.display =
                        'none';

                }

            });


        /* Hide map content boxes */

        document
            .querySelectorAll('.mapcontent')
            .forEach(function (content) {

                content.style.setProperty(
                    'display',
                    'none',
                    'important'
                );

            });

    }


    /* =====================================================
       NAVIGATION + INFO BOX HOVER EVENTS
       ===================================================== */

    document
        .querySelectorAll('svg polygon')
        .forEach(function (poly) {

            const id =
                poly.getAttribute('id');

            if (!id) return;


            /* -------------------------------------------
               MOUSE ENTER
               ------------------------------------------- */

            poly.addEventListener(
                'mouseenter',
                function () {

                    showNavItem(id);

                    showMapContent(id);

                }
            );


            /* -------------------------------------------
               MOUSE LEAVE
               ------------------------------------------- */

            poly.addEventListener(
                'mouseleave',
                function () {

                    console.log(
                        'MOUSELEAVE FIRED FOR:',
                        id
                    );

                    hideNavItem(id);

                    hideMapContent(id);

                }
            );


            /* -------------------------------------------
               CLICK

               CLICK ONLY MAKES THE NAVIGATION ITEM
               PERSISTENT.

               IT DOES NOT SHOW OR HIDE THE INFO BOX.
               ------------------------------------------- */

            poly.addEventListener(
                'click',
                function (e) {

                    /* -----------------------------------
                       DO NOTHING HERE IF THIS POLYGON
                       IS A LINK.
                       ----------------------------------- */

                    const link =
                        poly.closest('a[href]');

                    if (link) {

                        return;

                    }


                    persistentNav.add(id);

                    showNavItem(id);

                }
            );

        });


    /* =====================================================
       ESCAPE
       ===================================================== */

    document.addEventListener(
        'keydown',
        function (e) {

            if (e.key === 'Escape') {

                if (mapHistory.length) {

                    restorePreviousMapState();

                } else {

                    clearNavigation();

                }

            }

        }
    );

}


/* =========================================================
   WAIT FOR THE EXTERNAL MAP TO APPEAR
   ========================================================= */

function startMapWhenReady() {

    const mapContainer =
        document.getElementById('inter_map');

    if (!mapContainer) {
        return;
    }


    /* If the external SVG is already loaded, start now */

    if (
        mapContainer.querySelector(
            'svg polygon'
        )
    ) {

        initialiseMap();

        return;
    }


    /* Otherwise wait for the external HTML to appear */

    const observer =
        new MutationObserver(function () {

            if (
                mapContainer.querySelector(
                    'svg polygon'
                )
            ) {

                observer.disconnect();

                initialiseMap();

            }

        });


    observer.observe(
        mapContainer,
        {
            childList: true,
            subtree: true
        }

    );

}


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState === 'loading'
) {

    document.addEventListener(
        'DOMContentLoaded',
        startMapWhenReady
    );

} else {

    startMapWhenReady();

}
</script>
