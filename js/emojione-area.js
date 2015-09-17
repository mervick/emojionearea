
(function($, emojione) {

    var default_options = {
        template          : "<editor/><filters/><tabs/>",

        className         : "emojionearea",
        editorClassName   : "emojionearea-editor",
        filtersClassName  : "emojionearea-filters",
        filterClassName   : "emojionearea-filter",
        tabsClassName     : "emojionearea-tabs",
        tabClassName      : "emojionearea-tab",

        dir               : "ltr",
        spellcheck        : true,
        autocomplete      : "off",
        autocorrect       : "off",
        autocapitalize    : "off",
        autoHideFilters   : true,

        filtersSettings: {
            people: {
                icon: ":yum:",
                emoji: ":grinning::grin::joy::smiley::smile::sweat_smile::laughing::innocent::smiling_imp::imp::wink::blush:" +
                ":relaxed::yum::relieved::heart_eyes::sunglasses::smirk::neutral_face::expressionless::unamused::sweat:" +
                ":pensive::confused::confounded::kissing::kissing_heart::kissing_smiling_eyes::kissing_closed_eyes:" +
                ":stuck_out_tongue::stuck_out_tongue_winking_eye::stuck_out_tongue_closed_eyes::disappointed::worried:" +
                ":angry::rage::cry::persevere::triumph::disappointed_relieved::frowning::anguished::fearful::weary:" +
                ":sleepy::tired_face::grimacing::sob::open_mouth::hushed::cold_sweat::scream::astonished::flushed:" +
                ":sleeping::dizzy_face::no_mouth::mask::slight_frown::slight_smile::smile_cat::joy_cat::smiley_cat:" +
                ":heart_eyes_cat::smirk_cat::kissing_cat::pouting_cat::crying_cat_face::scream_cat::footprints:" +
                ":bust_in_silhouette::busts_in_silhouette::levitate::spy::baby::boy::girl::man::woman::family:" +
                ":family_mwg::family_mwgb::family_mwbb::family_mwgg::family_wwb::family_wwg::family_wwgb::family_wwbb:" +
                ":family_wwgg::family_mmb::family_mmg::family_mmgb::family_mmbb::family_mmgg::couple::two_men_holding_hands:" +
                ":two_women_holding_hands::dancers::bride_with_veil::person_with_blond_hair::man_with_gua_pi_mao:" +
                ":man_with_turban::older_man::older_woman::cop::construction_worker::princess::guardsman::angel:" +
                ":santa::ghost::japanese_ogre::japanese_goblin::poop::skull::alien::space_invader::bow:" +
                ":information_desk_person::no_good::ok_woman::raising_hand::person_with_pouting_face::person_frowning:" +
                ":massage::haircut::couple_with_heart::couple_ww::couple_mm::couplekiss::kiss_ww::kiss_mm::raised_hands:" +
                ":clap::ear::eye::eyes::nose::lips::kiss::tongue::nail_care::wave::thumbsup::thumbsdown:" +
                ":point_up::point_up_2::point_down::point_left::point_right::ok_hand::v::punch::fist::raised_hand:" +
                ":muscle::open_hands::writing_hand::hand_splayed::middle_finger::vulcan::pray:"
            },

            nature: {
                icon: ":whale:",
                emoji: ":seedling::evergreen_tree::deciduous_tree::palm_tree::cactus::tulip::cherry_blossom::rose::hibiscus:" +
                ":sunflower::blossom::bouquet::ear_of_rice::herb::four_leaf_clover::maple_leaf::fallen_leaf::leaves:" +
                ":mushroom::chestnut::rat::mouse2::mouse::hamster::ox::water_buffalo::cow2::cow::tiger2::leopard:" +
                ":tiger::chipmunk::rabbit2::rabbit::cat2::cat::racehorse::horse::ram::sheep::goat::rooster::chicken:" +
                ":baby_chick::hatching_chick::hatched_chick::bird::penguin::elephant::dromedary_camel::camel::boar::pig2:" +
                ":pig::pig_nose::dog2::poodle::dog::wolf::bear::koala::panda_face::monkey_face::see_no_evil::hear_no_evil:" +
                ":speak_no_evil::monkey::dragon::dragon_face::crocodile::snake::turtle::frog::whale2::whale::dolphin:" +
                ":octopus::fish::tropical_fish::blowfish::shell::snail::bug::ant::bee::beetle::spider::spider_web::feet:" +
                ":zap::fire::crescent_moon::sunny::partly_sunny::cloud::cloud_rain::cloud_snow::cloud_lightning::cloud_tornado:" +
                ":droplet::sweat_drops::umbrella::fog::dash::snowflake::star2::star::stars::sunrise_over_mountains::sunrise:" +
                ":rainbow::ocean::volcano::milky_way::mount_fuji::japan::globe_with_meridians::earth_africa::earth_americas:" +
                ":earth_asia::new_moon::waxing_crescent_moon::first_quarter_moon::waxing_gibbous_moon::full_moon:" +
                ":waning_gibbous_moon::last_quarter_moon::waning_crescent_moon::new_moon_with_face::full_moon_with_face:" +
                ":first_quarter_moon_with_face::last_quarter_moon_with_face::sun_with_face::wind_blowing_face:"
            },

            food_drink: {
                icon: ":cherries:",
                emoji: ":tomato::eggplant::corn::sweet_potato::hot_pepper::grapes::melon::watermelon::tangerine::lemon:" +
                ":banana::pineapple::apple::green_apple::pear::peach::cherries::strawberry::hamburger::pizza::meat_on_bone:" +
                ":poultry_leg::rice_cracker::rice_ball::rice::curry::ramen::spaghetti::bread::fries::dango::oden::sushi:" +
                ":fried_shrimp::fish_cake::icecream::shaved_ice::ice_cream::doughnut::cookie::chocolate_bar::candy:" +
                ":lollipop::custard::honey_pot::cake::bento::stew::egg::fork_and_knife::tea::coffee::sake::wine_glass:" +
                ":cocktail::tropical_drink::beer::beers::baby_bottle:"
            },

            celebration: {
                icon: ":tada:",
                emoji: ":ribbon::gift::birthday::jack_o_lantern::christmas_tree::tanabata_tree::bamboo::rice_scene:" +
                ":fireworks::sparkler::tada::confetti_ball::balloon::dizzy::sparkles::boom::mortar_board::crown:" +
                ":reminder_ribbon::military_medal::dolls::flags::wind_chime::crossed_flags::izakaya_lantern::ring:" +
                ":heart::broken_heart::love_letter::two_hearts::revolving_hearts::heartbeat::heartpulse::sparkling_heart:" +
                ":cupid::gift_heart::heart_decoration::purple_heart::yellow_heart::green_heart::blue_heart:"
            },

            activity: {
                icon: ":trophy:",
                emoji: ":runner::walking::dancer::lifter::golfer::rowboat::swimmer::surfer::bath::snowboarder::ski:" +
                ":snowman::bicyclist::mountain_bicyclist::motorcycle::race_car::horse_racing::tent::fishing_pole_and_fish:" +
                ":soccer::basketball::football::baseball::tennis::rugby_football::golf::trophy::medal::running_shirt_with_sash:" +
                ":checkered_flag::musical_keyboard::guitar::violin::saxophone::trumpet::musical_note::notes::musical_score:" +
                ":headphones::microphone::performing_arts::ticket::tophat::circus_tent::clapper::film_frames::tickets:" +
                ":art::dart::8ball::bowling::slot_machine::game_die::video_game::flower_playing_cards::black_joker:" +
                ":mahjong::carousel_horse::ferris_wheel::roller_coaster:"
            },

            travel: {
                icon: ":rocket:",
                emoji: ":railway_car::mountain_railway::steam_locomotive::train::monorail::bullettrain_side:" +
                ":bullettrain_front::train2::metro::light_rail::station::tram::railway_track::bus::oncoming_bus:" +
                ":trolleybus::minibus::ambulance::fire_engine::police_car::oncoming_police_car::rotating_light::taxi:" +
                ":oncoming_taxi::red_car::oncoming_automobile::blue_car::truck::articulated_lorry::tractor::bike:" +
                ":motorway::busstop::fuelpump::construction::vertical_traffic_light::traffic_light::rocket::helicopter:" +
                ":airplane::airplane_small::airplane_departure::airplane_arriving::seat::anchor::ship::cruise_ship:" +
                ":motorboat::speedboat::sailboat::aerial_tramway::mountain_cableway::suspension_railway:" +
                ":passport_control::customs::baggage_claim::left_luggage::yen::euro::pound::dollar::bellhop::bed:" +
                ":couch::fork_knife_plate::shopping_bags::statue_of_liberty::moyai::foggy::tokyo_tower::fountain:" +
                ":european_castle::japanese_castle::classical_building::stadium::mountain_snow::camping::beach:" +
                ":desert::island::park::cityscape::city_sunset::city_dusk::night_with_stars::bridge_at_night::house:" +
                ":homes::house_with_garden::house_abandoned::contruction_site::office::department_store::factory:" +
                ":post_office::european_post_office::hospital::bank::hotel::love_hotel::wedding::church:" +
                ":convenience_store::school::map:"
            },

            objects_symbols: {
                icon: ":paperclips:",
                emoji: ":watch::iphone::calling::computer::desktop::keyboard::trackball::printer::alarm_clock::clock:" +
                ":hourglass_flowing_sand::hourglass::camera::camera_with_flash::video_camera::movie_camera::projector:" +
                ":tv::microphone2::level_slider::control_knobs::radio::pager::joystick::telephone_receiver::telephone:" +
                ":fax::minidisc::floppy_disk::cd::dvd::vhs::battery::electric_plug::bulb::flashlight::candle::satellite:" +
                ":satellite_orbital::credit_card::money_with_wings::moneybag::gem::closed_umbrella::pouch::purse:" +
                ":handbag::briefcase::school_satchel::lipstick::eyeglasses::dark_sunglasses::womans_hat::sandal:" +
                ":high_heel::boot::mans_shoe::athletic_shoe::bikini::dress::kimono::womans_clothes::shirt::necktie:" +
                ":jeans::door::shower::bathtub::toilet::barber::syringe::pill::microscope::telescope::crystal_ball:" +
                ":wrench::knife::dagger::nut_and_bolt::hammer::tools::oil::bomb::smoking::gun::bookmark::newspaper:" +
                ":newspaper2::thermometer::label::key::key2::envelope::envelope_with_arrow::incoming_envelope::e-mail:" +
                ":inbox_tray::outbox_tray::package::postal_horn::postbox::mailbox_closed::mailbox::mailbox_with_no_mail:" +
                ":mailbox_with_mail::page_facing_up::page_with_curl::bookmark_tabs::wastebasket::notepad_spiral:" +
                ":chart_with_upwards_trend::chart_with_downwards_trend::bar_chart::date::calendar::calendar_spiral:" +
                ":ballot_box::low_brightness::high_brightness::compression::frame_photo::scroll::clipboard::book:" +
                ":notebook::notebook_with_decorative_cover::ledger::closed_book::green_book::blue_book::orange_book:" +
                ":books::card_index::dividers::card_box::link::paperclip::paperclips::pushpin::scissors:" +
                ":triangular_ruler::round_pushpin::straight_ruler::triangular_flag_on_post::flag_white::flag_black:" +
                ":hole::file_folder::open_file_folder::file_cabinet::black_nib::pencil2::pen_ballpoint::pen_fountain:" +
                ":paintbrush::crayon::pencil::lock_with_ink_pen::closed_lock_with_key::lock::unlock::mega::loudspeaker:" +
                ":speaker::sound::loud_sound::mute::zzz::bell::no_bell::cross_heavy::om_symbol::dove::thought_balloon:" +
                ":speech_balloon::anger_right::children_crossing::shield::mag::mag_right::speaking_head:" +
                ":sleeping_accommodation::no_entry_sign::no_entry::name_badge::no_pedestrians::do_not_litter:" +
                ":no_bicycles::non-potable_water::no_mobile_phones::underage::sparkle::eight_spoked_asterisk:" +
                ":negative_squared_cross_mark::white_check_mark::eight_pointed_black_star::vibration_mode:" +
                ":mobile_phone_off::vs::a::b::ab::cl::o2::sos::id::parking::wc::cool::free::new::ng::ok::up::atm:" +
                ":aries::taurus::gemini::cancer::leo::virgo::libra::scorpius::sagittarius::capricorn::aquarius:" +
                ":pisces::restroom::mens::womens::baby_symbol::wheelchair::potable_water::no_smoking:" +
                ":put_litter_in_its_place::arrow_forward::arrow_backward::arrow_up_small::arrow_down_small:" +
                ":fast_forward::rewind::arrow_double_up::arrow_double_down::arrow_right::arrow_left::arrow_up:" +
                ":arrow_down::arrow_upper_right::arrow_lower_right::arrow_lower_left::arrow_upper_left::arrow_up_down:" +
                ":left_right_arrow::arrows_counterclockwise::arrow_right_hook::leftwards_arrow_with_hook:" +
                ":arrow_heading_up::arrow_heading_down::twisted_rightwards_arrows::repeat::repeat_one::hash:" +
                ":zero::one::two::three::four::five::six::seven::eight::nine::keycap_ten::1234::abc::abcd::capital_abcd:" +
                ":information_source::signal_strength::cinema::symbols::heavy_plus_sign::heavy_minus_sign::wavy_dash:" +
                ":heavy_division_sign::heavy_multiplication_x::heavy_check_mark::arrows_clockwise::tm::copyright:" +
                ":registered::currency_exchange::heavy_dollar_sign::curly_loop::loop::part_alternation_mark:" +
                ":exclamation::question::grey_exclamation::grey_question::bangbang::interrobang::x::o::100::end:" +
                ":back::on::top::soon::cyclone::m::ophiuchus::six_pointed_star::beginner::trident::warning:" +
                ":hotsprings::rosette::recycle::anger::diamond_shape_with_a_dot_inside::spades::clubs::hearts:" +
                ":diamonds::ballot_box_with_check::white_circle::black_circle::radio_button::red_circle:" +
                ":large_blue_circle::small_red_triangle::small_red_triangle_down::small_orange_diamond:" +
                ":small_blue_diamond::large_orange_diamond::large_blue_diamond::black_small_square:" +
                ":white_small_square::black_large_square::white_large_square::black_medium_square::white_medium_square:" +
                ":black_medium_small_square::white_medium_small_square::black_square_button::white_square_button:" +
                ":clock1::clock2::clock3::clock4::clock5::clock6::clock7::clock8::clock9::clock10::clock11:" +
                ":clock12::clock130::clock230::clock330::clock430::clock530::clock630::clock730::clock830::clock930:" +
                ":clock1030::clock1130::clock1230:"
            },

            flags: {
                icon: ":triangular_flag_on_post:",
                emoji: ":flag_au::flag_at::flag_be::flag_br::flag_ca::flag_cl::flag_cn::flag_co::flag_dk::flag_fi:" +
                ":flag_fr::flag_de::flag_hk::flag_in::flag_id::flag_ie::flag_il::flag_it::flag_jp::flag_kr::flag_mo:" +
                ":flag_my::flag_mx::flag_nl::flag_nz::flag_no::flag_ph::flag_pl::flag_pt::flag_pr::flag_ru::flag_sa:" +
                ":flag_sg::flag_za::flag_es::flag_se::flag_ch::flag_tr::flag_gb::flag_us::flag_ae::flag_vn::flag_af:" +
                ":flag_al::flag_dz::flag_ad::flag_ao::flag_ai::flag_ag::flag_ar::flag_am::flag_aw::flag_ac::flag_az:" +
                ":flag_bs::flag_bh::flag_bd::flag_bb::flag_by::flag_bz::flag_bj::flag_bm::flag_bt::flag_bo::flag_ba:" +
                ":flag_bw::flag_bn::flag_bg::flag_bf::flag_bi::flag_kh::flag_cm::flag_cv::flag_ky::flag_cf::flag_km:" +
                ":flag_cd::flag_cg::flag_td::flag_cr::flag_ci::flag_hr::flag_cu::flag_cy::flag_cz::flag_dj::flag_dm:" +
                ":flag_do::flag_tl::flag_ec::flag_eg::flag_sv::flag_gq::flag_er::flag_ee::flag_et::flag_fk::flag_fo:" +
                ":flag_fj::flag_pf::flag_ga::flag_gm::flag_ge::flag_gh::flag_gi::flag_gr::flag_gl::flag_gd::flag_gu:" +
                ":flag_gt::flag_gn::flag_gw::flag_gy::flag_ht::flag_hn::flag_hu::flag_is::flag_ir::flag_iq::flag_jm:" +
                ":flag_je::flag_jo::flag_kz::flag_ke::flag_ki::flag_xk::flag_kw::flag_kg::flag_la::flag_lv::flag_lb:" +
                ":flag_ls::flag_lr::flag_ly::flag_li::flag_lt::flag_lu::flag_mk::flag_mg::flag_mw::flag_mv::flag_ml:" +
                ":flag_mt::flag_mh::flag_mr::flag_mu::flag_fm::flag_md::flag_mc::flag_mn::flag_me::flag_ms::flag_ma:" +
                ":flag_mz::flag_mm::flag_na::flag_nr::flag_np::flag_nc::flag_ni::flag_ne::flag_ng::flag_nu::flag_kp:" +
                ":flag_om::flag_pk::flag_pw::flag_ps::flag_pa::flag_pg::flag_py::flag_pe::flag_qa::flag_ro::flag_rw:" +
                ":flag_sh::flag_kn::flag_lc::flag_vc::flag_ws::flag_sm::flag_st::flag_sn::flag_rs::flag_sc::flag_sl:" +
                ":flag_sk::flag_si::flag_sb::flag_so::flag_lk::flag_sd::flag_sr::flag_sz::flag_sy::flag_tw::flag_tj:" +
                ":flag_tz::flag_th::flag_tg::flag_to::flag_tt::flag_tn::flag_tm::flag_tv::flag_vi::flag_ug::flag_ua:" +
                ":flag_uy::flag_uz::flag_vu::flag_va::flag_ve::flag_wf::flag_eh::flag_ye::flag_zm::flag_zw:"
            }
        }
    };

    var slice = [].slice;


    var EmojioneArea = function(element, options) {
        this.element = $(element);
        this.options = $.extend({}, default_options, options);
        this.elementValFunc = this.element.is("INPUT") ? 'val' : 'text';
        this.events = {};

        init.apply(this);
    };

    EmojioneArea.prototype.on = function(events, handler) {
        if (!!events && $.isFunction(handler)) {
            $.each(events.split(' '), $.proxy(function(i, event) {
                if (!this.events[event]) {
                    this.events[event] = [];
                }
                this.events[event].push(handler);
            }, this));
        }
        return this;
    };

    EmojioneArea.prototype.off = function(events, handler) {
        if (!!events) {
            var system = /^emojioneArea\./;
            if ($.isFunction(handler)) {
                $.each(events.split(' '), $.proxy(function(i, event) {
                    if (!system.test(event) && !!this.events[event] && !!this.events[event].length) {
                        $.each(this.events[event], $.proxy(function(j, fn) {
                            if (fn === handler) {
                                this.events[event] = this.events[event].splice(j, 1);
                            }
                        }, this));
                    }
                }, this));
            } else {
                $.each(events.split(' '), $.proxy(function(i, event) {
                    if (!system.test(event)) {
                        this.events[event] = [];
                    }
                }, this));
            }
        }
        return this;
    };

    EmojioneArea.prototype.trigger = function(events) {
        var result = true, args;
        if (!!events) {
            args = slice.call(arguments, 1);
            $.each(events.split(' '), $.proxy(function(i, event) {
                if (!!this.events[event] && !!this.events[event].length) {
                    $.each(this.events[event], $.proxy(function (i, fn) {
                        return result = fn.apply(this, args) !== false;
                    }, this));
                }
                return result;
            }, this));
        }
        return result;
    };

    EmojioneArea.prototype.attach = function(element, events, fn) {

        var attachEvents = function(element, event, trigger) {
                element.on(event, $.proxy(function() {
                    var args = [trigger];
                    if ($.isFunction(fn) || $.isArray(fn)) {
                        var result = $.isFunction(fn) ? fn.apply(this, slice.call(arguments)) : fn;
                        if (!result) {
                            return;
                        }
                        if ($.isArray(result)) {
                            args = args.concat(result);
                        }
                    }
                    this.trigger.apply(this, args.concat(slice.call(arguments)));
                }, this));
            },

        attachElement = function(element) {
            if ((typeof events).toLowerCase() == "string") {
                attachEvents.apply(this, [element, events, events]);
            } else {
                $.each(events, $.proxy(function(i, v) {
                    attachEvents.apply(this, [element, $.isArray(events) ? v : i, v]);
                }, this));
            }
        }

        if ($.isArray(element)) {
            $.each(element, $.proxy(function(i, e) {
                attachElement.apply(this, [$(e)]);
            }, this));
        } else {
            attachElement.apply(this, [element]);
        }

        return this;
    };

    EmojioneArea.prototype.setText = function(content) {
        content = content
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/(?:\r\n|\r|\n)/g, '\n')
            .replace(/(\n+)/g, '<div>$1</div>')
            .replace(/\n/g, '<br/>')
            .replace(/<br\/><\/div>/g, '</div>');

        this.editor.html('<div>' + unicodeToImage(content) + '</div>');
        this.content = this.editor.html();
        this.trigger('emojioneArea.change change', this.content);
    }

    EmojioneArea.prototype.getText = function() {
        return this.editor.html()
            .replace(/<img class="emojione" alt="([^"]+)"[^>]*>/ig, '$1')
            .replace(/\n|\r/g, '')
            .replace(/<br(?:[^>]+)?>/ig, '\n')
            .replace(/(?:<div(?:[^>]+)?>)+/ig, '<div>')
            .replace(/(?:<\/div>)+/ig, '</div>')
            .replace(/(?:<p(?:[^>]+)?>)+/ig, '<div>')
            .replace(/(?:<\/p>)+/ig, '</div>')
            .replace(/\n<div><\/div>/ig, '\n')
            .replace(/<div><\/div>\n/ig, '\n')
            .replace(/(?:<div>)+<\/div>/ig, '\n')
            .replace(/([^\n])<\/div><div>/ig, '$1\n')
            .replace(/(?:<\/div>)+/ig, '</div>')
            .replace(/([^\n])<\/div>([^\n])/ig, '$1\n$2')
            .replace(/<\/div>/ig, '')
            .replace(/([^\n])<div>/ig, '$1\n')
            .replace(/\n<div>/ig, '\n')
            .replace(/<div>\n/ig, '\n\n')
            .replace(/<(?:[^>]+)?>/g, '');
    }

    function unicodeToImage(str) {
        return str.replace(new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+
            emojione.unicodeRegexp+")", "gi"),function(unicodeChar) {
            if((typeof unicodeChar === 'undefined') || (unicodeChar === '') || (!(unicodeChar in emojione.jsecapeMap))) {
                return unicodeChar;
            }
            else {
                var unicode = emojione.jsecapeMap[unicodeChar],
                    alt = emojione.convert(unicode);

                return '<img class="emojione" alt="'+alt+'" src="'+emojione.imagePathPNG+unicode+'.png'+emojione.cacheBustParam+'"/>';
            }
        });
    }

    function shortnameTo(str, template) {
        return str.replace(new RegExp("<object[^>]*>.*?<\/object>|<span[^>]*>.*?<\/span>|<(?:object|embed|svg|img|div|span|p|a)[^>]*>|("+
            emojione.shortnameRegexp+")", "gi"),function(shortname) {
            if( (typeof shortname === 'undefined') || (shortname === '') || (!(shortname in emojione.emojioneList)) ) {
                return shortname;
            }
            else {
                var unicode = emojione.emojioneList[shortname][emojione.emojioneList[shortname].length-1].toUpperCase(),
                    alt = emojione.convert(unicode);
                return template
                    .replace('{shortname}', shortname)
                    .replace('{imagePng}', emojione.imagePathPNG+unicode+'.png'+emojione.cacheBustParam)
                    .replace('{unicode}', unicode)
                    .replace('{alt}', alt);
            }
        });
    };

    function pasteHtmlAtCaret(html) {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // only relatively recently standardized and is not supported in
                // some browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }
    }

    function init() {
        // parse template
        this.app = this.options.template;

        $.each(["editor", "filters", "tabs"], $.proxy(function(i, name) {
            this.app = this.app.replace(new RegExp('<' + name + '/?>' ,'i'),
                '<div class="' + this.options[name + 'ClassName'] + '"></div>');
        }, this));

        // wrap application
        this.app = $('<div>' + this.app + '</div>')
            .addClass(this.options.className)
            .attr("role", "application");

        // set editor attributes
        this.editor = this.app.find("." + this.options.editorClassName)
            .attr("contenteditable", "true")
            .attr('tabindex', 0);

        $.each(["dir", "spellcheck", "autocomplete", "autocorrect", "autocapitalize"], $.proxy(function(i, name) {
            this.editor.attr(name, this.options[name]);
        }, this));

        // filters
        this.filters = this.app.find("." + this.options.filtersClassName).hide();

        // tabs
        this.tabs = this.app.find("." + this.options.tabsClassName);

        // parse icons
        $.each(this.options.filtersSettings, $.proxy(function(filter, params) {
            // filters
            $("<span></span>")
                .wrapInner(shortnameTo(params.icon, '<span class="emojione-{unicode}">{alt}</span>'))
                .addClass(this.options.filterClassName)
                .attr("data-filter", filter)
                .attr("role", "button")
                .appendTo(this.filters);

            // tabs
            $("<div></div>")
                .wrapInner(shortnameTo(params.emoji,
                    '<span class="emojibtn"><span class="emojione-{unicode}" data-shortname="{shortname}">{alt}</span></span>'))
                .addClass(this.options.tabClassName)
                .addClass(this.options.tabClassName + '-' + filter)
                .hide()
                .appendTo(this.tabs);
        }, this));

        // show first tab
        //this.filters.children("." + this.options.filterClassName + ":first").addClass("active");
        //this.tabs.children("." + this.options.tabClassName + ":first").show();

        var returnTarget = function(e) {
            return [$(e.currentTarget)];
        };

        // attach events
        this
            .attach(this.filters, {"mousedown" : "emojioneArea.filters.mousedown filters.mousedown"}, [this.editor])
            .attach(this.tabs, {"mousedown" : "emojioneArea.tabs.mousedown tabs.mousedown"}, [this.editor])
            .attach(this.editor, {"focus": "emojioneArea.focus focus", "blur": "emojioneArea.blur blur"}, [this.editor])
            .attach([this.editor, this.filters, this.tabs], ["mousedown", "mouseup", "click", "keyup", "keydown"], [this.editor])
            .attach(this.filters.find("." + this.options.filterClassName), {"click" :"emojioneArea.filter.click filter.click"}, returnTarget)
            .attach(this.tabs.find(".emojibtn"), {"click" :"emojioneArea.emojibtn.click emojibtn.click"}, returnTarget)


            .on("emojioneArea.filter.click", function(element) {
                if (element.is(".active")) {
                    element.removeClass("active");
                    this.tabs.children("." + this.options.tabClassName).hide();
                } else {
                    element.parent().find("." + this.options.filterClassName + ".active").removeClass("active");
                    element.addClass("active");
                    this.tabs.children("." + this.options.tabClassName).hide()
                        .filter("." + this.options.tabClassName + "-" + element.data("filter")).show();
                }
            })

            .on("emojioneArea.emojibtn.click", function(element) {
                pasteHtmlAtCaret(shortnameTo(element.children("span").data("shortname"),
                    '<img class="emojione" alt="{alt}" src="{imagePng}"/>'));
            })

            .on("emojioneArea.filters.mousedown emojioneArea.tabs.mousedown", function(element, event) {
                event.preventDefault();
                return false;
            })

            .on("emojioneArea.change", function() {
                this.element[this.elementValFunc](this.getText());
            })

            .on("emojioneArea.focus", function() {
                this.app.addClass("focused");
                this.filters.slideDown(400);
            })

            .on("emojioneArea.blur", function() {
                this.app.removeClass("focused");
                this.filters.slideUp(400);
                var content = this.editor.html();
                this.filters.find("." + this.options.filterClassName + ".active").removeClass("active");
                this.tabs.children("." + this.options.tabClassName).hide();
                if (this.content !== content) {
                    this.content = content;
                    this.trigger('emojioneArea.change change', this.content);
                }
            });

        // show application
        this.app.insertAfter(this.element);
        this.element.hide();

        this.setText(this.element[this.elementValFunc]());
    };


    $.fn.emojioneArea = function(options) {
        return this.each(function() {
            if (!!this.emojioneArea) return this.emojioneArea;
            return this.emojioneArea = new EmojioneArea($(this), options);
        });
    };

}) (jQuery, emojione);