define([], function() {
    return {
        attributes: {
            dir               : "ltr",
            spellcheck        : false,
            autocomplete      : "off",
            autocorrect       : "off",
            autocapitalize    : "off",
        },
        placeholder       : null,
        container         : null,
        hideSource        : true,
        shortnames        : true,
        sprite            : true,
        pickerPosition    : "top", // top | bottom | right
        filtersPosition   : "top", // top | bottom
        hidePickerOnBlur  : true,
        buttonTitle       : "Use the TAB key to insert emoji faster",
        tones             : true,
        tonesStyle        : "bullet", // bullet | radio | square | checkbox
        inline            : null, // null - auto
        saveEmojisAs      : "unicode", // unicode | shortname | image
        shortcuts         : true,
        autocomplete      : true,
        autocompleteTones : false,

        filters: {
            tones: {
                title: "Diversity",
                emoji: "santa runner surfer swimmer lifter ear nose point_up_2 point_down point_left point_right punch " +
                "wave ok_hand thumbsup thumbsdown clap open_hands boy girl man woman cop bride_with_veil person_with_blond_hair " +
                "man_with_gua_pi_mao man_with_turban older_man grandma baby construction_worker princess angel " +
                "information_desk_person guardsman dancer nail_care massage haircut muscle spy hand_splayed middle_finger " +
                "vulcan no_good ok_woman bow raising_hand raised_hands person_frowning person_with_pouting_face pray rowboat " +
                "bicyclist mountain_bicyclist walking bath metal point_up basketball_player fist raised_hand v writing_hand"
            },

            smileys_people: {
                icon: "yum",
                title: "Smileys & People",
                emoji: "grinning grimacing grin joy smiley smile sweat_smile laughing innocent wink blush slight_smile " +
                "upside_down relaxed yum relieved heart_eyes kissing_heart kissing kissing_smiling_eyes " +
                "kissing_closed_eyes stuck_out_tongue_winking_eye stuck_out_tongue_closed_eyes stuck_out_tongue " +
                "money_mouth nerd sunglasses hugging smirk no_mouth neutral_face expressionless unamused rolling_eyes " +
                "thinking flushed disappointed worried angry rage pensive confused slight_frown frowning2 persevere " +
                "confounded tired_face weary triumph open_mouth scream fearful cold_sweat hushed frowning anguished " +
                "cry disappointed_relieved sleepy sweat sob dizzy_face astonished zipper_mouth mask thermometer_face " +
                "head_bandage sleeping zzz poop smiling_imp imp japanese_ogre japanese_goblin skull ghost alien robot " +
                "smiley_cat smile_cat joy_cat heart_eyes_cat smirk_cat kissing_cat scream_cat crying_cat_face " +
                "pouting_cat raised_hands clap wave thumbsup thumbsdown punch fist v ok_hand raised_hand open_hands " +
                "muscle pray point_up point_up_2 point_down point_left point_right middle_finger hand_splayed metal " +
                "vulcan writing_hand nail_care lips tongue ear nose eye eyes bust_in_silhouette busts_in_silhouette " +
                "speaking_head baby boy girl man woman person_with_blond_hair older_man older_woman man_with_gua_pi_mao " +
                "man_with_turban cop construction_worker guardsman spy santa angel princess bride_with_veil walking " +
                "runner dancer dancers couple two_men_holding_hands two_women_holding_hands bow information_desk_person " +
                "no_good ok_woman raising_hand person_with_pouting_face person_frowning haircut massage couple_with_heart " +
                "couple_ww couple_mm couplekiss kiss_ww kiss_mm family family_mwg family_mwgb family_mwbb family_mwgg " +
                "family_wwb family_wwg family_wwgb family_wwbb family_wwgg family_mmb family_mmg family_mmgb family_mmbb " +
                "family_mmgg womans_clothes shirt jeans necktie dress bikini kimono lipstick kiss footprints high_heel " +
                "sandal boot mans_shoe athletic_shoe womans_hat tophat helmet_with_cross mortar_board crown school_satchel " +
                "pouch purse handbag briefcase eyeglasses dark_sunglasses ring closed_umbrella"
            },

            animals_nature: {
                icon: "hamster",
                title: "Animals & Nature",
                emoji: "dog cat mouse hamster rabbit bear panda_face koala tiger lion_face cow pig pig_nose frog " +
                "octopus monkey_face see_no_evil hear_no_evil speak_no_evil monkey chicken penguin bird baby_chick " +
                "hatching_chick hatched_chick wolf boar horse unicorn bee bug snail beetle ant spider scorpion crab " +
                "snake turtle tropical_fish fish blowfish dolphin whale whale2 crocodile leopard tiger2 water_buffalo " +
                "ox cow2 dromedary_camel camel elephant goat ram sheep racehorse pig2 rat mouse2 rooster turkey dove " +
                "dog2 poodle cat2 rabbit2 chipmunk feet dragon dragon_face cactus christmas_tree evergreen_tree " +
                "deciduous_tree palm_tree seedling herb shamrock four_leaf_clover bamboo tanabata_tree leaves " +
                "fallen_leaf maple_leaf ear_of_rice hibiscus sunflower rose tulip blossom cherry_blossom bouquet " +
                "mushroom chestnut jack_o_lantern shell spider_web earth_americas earth_africa earth_asia full_moon " +
                "waning_gibbous_moon last_quarter_moon waning_crescent_moon new_moon waxing_crescent_moon " +
                "first_quarter_moon waxing_gibbous_moon new_moon_with_face full_moon_with_face first_quarter_moon_with_face " +
                "last_quarter_moon_with_face sun_with_face crescent_moon star star2 dizzy sparkles comet sunny " +
                "white_sun_small_cloud partly_sunny white_sun_cloud white_sun_rain_cloud cloud cloud_rain " +
                "thunder_cloud_rain cloud_lightning zap fire boom snowflake cloud_snow snowman2 snowman wind_blowing_face " +
                "dash cloud_tornado fog umbrella2 umbrella droplet sweat_drops ocean"
            },

            food_drink: {
                icon: "pizza",
                title: "Food & Drink",
                emoji: "green_apple apple pear tangerine lemon banana watermelon grapes strawberry melon cherries peach " +
                "pineapple tomato eggplant hot_pepper corn sweet_potato honey_pot bread cheese poultry_leg meat_on_bone " +
                "fried_shrimp egg hamburger fries hotdog pizza spaghetti taco burrito ramen stew fish_cake sushi bento " +
                "curry rice_ball rice rice_cracker oden dango shaved_ice ice_cream icecream cake birthday custard candy " +
                "lollipop chocolate_bar popcorn doughnut cookie beer beers wine_glass cocktail tropical_drink champagne " +
                "sake tea coffee baby_bottle fork_and_knife fork_knife_plate"
            },

            activity: {
                icon: "basketball",
                title: "Activity",
                emoji: "soccer basketball football baseball tennis volleyball rugby_football 8ball golf golfer ping_pong " +
                "badminton hockey field_hockey cricket ski skier snowboarder ice_skate bow_and_arrow fishing_pole_and_fish " +
                "rowboat swimmer surfer bath basketball_player lifter bicyclist mountain_bicyclist horse_racing levitate " +
                "trophy running_shirt_with_sash medal military_medal reminder_ribbon rosette ticket tickets performing_arts " +
                "art circus_tent microphone headphones musical_score musical_keyboard saxophone trumpet guitar violin " +
                "clapper video_game space_invader dart game_die slot_machine bowling"
            },

            travel_places: {
                icon: "rocket",
                title: "Travel & Places",
                emoji: "red_car taxi blue_car bus trolleybus race_car police_car ambulance fire_engine minibus truck " +
                "articulated_lorry tractor motorcycle bike rotating_light oncoming_police_car oncoming_bus " +
                "oncoming_automobile oncoming_taxi aerial_tramway mountain_cableway suspension_railway railway_car " +
                "train monorail bullettrain_side bullettrain_front light_rail mountain_railway steam_locomotive train2 " +
                "metro tram station helicopter airplane_small airplane airplane_departure airplane_arriving sailboat " +
                "motorboat speedboat ferry cruise_ship rocket satellite_orbital seat anchor construction fuelpump busstop " +
                "vertical_traffic_light traffic_light checkered_flag ship ferris_wheel roller_coaster carousel_horse " +
                "construction_site foggy tokyo_tower factory fountain rice_scene mountain mountain_snow mount_fuji volcano " +
                "japan camping tent park motorway railway_track sunrise sunrise_over_mountains desert beach island " +
                "city_sunset city_dusk cityscape night_with_stars bridge_at_night milky_way stars sparkler fireworks " +
                "rainbow homes european_castle japanese_castle stadium statue_of_liberty house house_with_garden " +
                "house_abandoned office department_store post_office european_post_office hospital bank hotel " +
                "convenience_store school love_hotel wedding classical_building church mosque synagogue kaaba shinto_shrine"
            },

            objects: {
                icon: "bulb",
                title: "Objects",
                emoji: "watch iphone calling computer keyboard desktop printer mouse_three_button trackball joystick " +
                "compression minidisc floppy_disk cd dvd vhs camera camera_with_flash video_camera movie_camera projector " +
                "film_frames telephone_receiver telephone pager fax tv radio microphone2 level_slider control_knobs " +
                "stopwatch timer alarm_clock clock hourglass_flowing_sand hourglass satellite battery electric_plug bulb " +
                "flashlight candle wastebasket oil money_with_wings dollar yen euro pound moneybag credit_card gem scales " +
                "wrench hammer hammer_pick tools pick nut_and_bolt gear chains gun bomb knife dagger crossed_swords shield " +
                "smoking skull_crossbones coffin urn amphora crystal_ball prayer_beads barber alembic telescope microscope " +
                "hole pill syringe thermometer label bookmark toilet shower bathtub key key2 couch sleeping_accommodation " +
                "bed door bellhop frame_photo map beach_umbrella moyai shopping_bags balloon flags ribbon gift confetti_ball " +
                "tada dolls wind_chime crossed_flags izakaya_lantern envelope envelope_with_arrow incoming_envelope e-mail " +
                "love_letter postbox mailbox_closed mailbox mailbox_with_mail mailbox_with_no_mail package postal_horn " +
                "inbox_tray outbox_tray scroll page_with_curl bookmark_tabs bar_chart chart_with_upwards_trend " +
                "chart_with_downwards_trend page_facing_up date calendar calendar_spiral card_index card_box ballot_box " +
                "file_cabinet clipboard notepad_spiral file_folder open_file_folder dividers newspaper2 newspaper notebook " +
                "closed_book green_book blue_book orange_book notebook_with_decorative_cover ledger books book link " +
                "paperclip paperclips scissors triangular_ruler straight_ruler pushpin round_pushpin triangular_flag_on_post " +
                "flag_white flag_black closed_lock_with_key lock unlock lock_with_ink_pen pen_ballpoint pen_fountain " +
                "black_nib pencil pencil2 crayon paintbrush mag mag_right"
            },

            symbols: {
                icon: "heartpulse",
                title: "Symbols",
                emoji: "heart yellow_heart green_heart blue_heart purple_heart broken_heart heart_exclamation two_hearts " +
                "revolving_hearts heartbeat heartpulse sparkling_heart cupid gift_heart heart_decoration peace cross " +
                "star_and_crescent om_symbol wheel_of_dharma star_of_david six_pointed_star menorah yin_yang orthodox_cross " +
                "place_of_worship ophiuchus aries taurus gemini cancer leo virgo libra scorpius sagittarius capricorn " +
                "aquarius pisces id atom u7a7a u5272 radioactive biohazard mobile_phone_off vibration_mode u6709 u7121 " +
                "u7533 u55b6 u6708 eight_pointed_black_star vs accept white_flower ideograph_advantage secret congratulations " +
                "u5408 u6e80 u7981 a b ab cl o2 sos no_entry name_badge no_entry_sign x o anger hotsprings no_pedestrians " +
                "do_not_litter no_bicycles non-potable_water underage no_mobile_phones exclamation grey_exclamation question " +
                "grey_question bangbang interrobang 100 low_brightness high_brightness trident fleur-de-lis part_alternation_mark " +
                "warning children_crossing beginner recycle u6307 chart sparkle eight_spoked_asterisk negative_squared_cross_mark " +
                "white_check_mark diamond_shape_with_a_dot_inside cyclone loop globe_with_meridians m atm sa passport_control " +
                "customs baggage_claim left_luggage wheelchair no_smoking wc parking potable_water mens womens baby_symbol " +
                "restroom put_litter_in_its_place cinema signal_strength koko ng ok up cool new free zero one two three four " +
                "five six seven eight nine ten 1234 arrow_forward pause_button play_pause stop_button record_button track_next " +
                "track_previous fast_forward rewind twisted_rightwards_arrows repeat repeat_one arrow_backward arrow_up_small " +
                "arrow_down_small arrow_double_up arrow_double_down arrow_right arrow_left arrow_up arrow_down arrow_upper_right " +
                "arrow_lower_right arrow_lower_left arrow_upper_left arrow_up_down left_right_arrow arrows_counterclockwise " +
                "arrow_right_hook leftwards_arrow_with_hook arrow_heading_up arrow_heading_down hash asterisk information_source " +
                "abc abcd capital_abcd symbols musical_note notes wavy_dash curly_loop heavy_check_mark arrows_clockwise " +
                "heavy_plus_sign heavy_minus_sign heavy_division_sign heavy_multiplication_x heavy_dollar_sign currency_exchange " +
                "copyright registered tm end back on top soon ballot_box_with_check radio_button white_circle black_circle " +
                "red_circle large_blue_circle small_orange_diamond small_blue_diamond large_orange_diamond large_blue_diamond " +
                "small_red_triangle black_small_square white_small_square black_large_square white_large_square small_red_triangle_down " +
                "black_medium_square white_medium_square black_medium_small_square white_medium_small_square black_square_button " +
                "white_square_button speaker sound loud_sound mute mega loudspeaker bell no_bell black_joker mahjong spades " +
                "clubs hearts diamonds flower_playing_cards thought_balloon anger_right speech_balloon clock1 clock2 clock3 " +
                "clock4 clock5 clock6 clock7 clock8 clock9 clock10 clock11 clock12 clock130 clock230 clock330 clock430 " +
                "clock530 clock630 clock730 clock830 clock930 clock1030 clock1130 clock1230 eye_in_speech_bubble"
            },

            flags: {
                icon: "flag_gb",
                title: "Flags",
                emoji: "ac af al dz ad ao ai ag ar am aw au at az bs bh bd bb by be bz bj bm bt bo ba bw br bn bg bf bi " +
                "cv kh cm ca ky cf td flag_cl cn co km cg flag_cd cr hr cu cy cz dk dj dm do ec eg sv gq er ee et fk fo " +
                "fj fi fr pf ga gm ge de gh gi gr gl gd gu gt gn gw gy ht hn hk hu is in flag_id ir iq ie il it ci jm jp " +
                "je jo kz ke ki xk kw kg la lv lb ls lr ly li lt lu mo mk mg mw my mv ml mt mh mr mu mx fm md mc mn me " +
                "ms ma mz mm na nr np nl nc nz ni ne flag_ng nu kp no om pk pw ps pa pg py pe ph pl pt pr qa ro ru rw " +
                "sh kn lc vc ws sm st flag_sa sn rs sc sl sg sk si sb so za kr es lk sd sr sz se ch sy tw tj tz th tl " +
                "tg to tt tn tr flag_tm flag_tm ug ua ae gb us vi uy uz vu va ve vn wf eh ye zm zw re ax ta io bq cx " +
                "cc gg im yt nf pn bl pm gs tk bv hm sj um ic ea cp dg as aq vg ck cw eu gf tf gp mq mp sx ss tc "
            }
        }
    };
});