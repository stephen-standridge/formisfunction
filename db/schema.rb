# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161218230943) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.string   "author_type"
    t.integer  "author_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree
  end

  create_table "admin_users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "articles", force: :cascade do |t|
    t.string   "slug"
    t.string   "title"
    t.text     "body"
    t.integer  "order"
    t.integer  "component_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["component_id"], name: "index_articles_on_component_id", using: :btree
    t.index ["slug"], name: "index_articles_on_slug", using: :btree
  end

  create_table "audio_clips", force: :cascade do |t|
    t.string   "slug"
    t.integer  "order"
    t.time     "start"
    t.time     "end"
    t.integer  "component_id"
    t.integer  "audio_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["audio_id"], name: "index_audio_clips_on_audio_id", using: :btree
    t.index ["component_id"], name: "index_audio_clips_on_component_id", using: :btree
    t.index ["slug"], name: "index_audio_clips_on_slug", using: :btree
  end

  create_table "audios", force: :cascade do |t|
    t.string   "url"
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "components", force: :cascade do |t|
    t.string   "slug"
    t.string   "component_type"
    t.string   "name"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.index ["slug"], name: "index_components_on_slug", using: :btree
  end

  create_table "components_views", id: false, force: :cascade do |t|
    t.integer "view_id"
    t.integer "component_id"
    t.index ["component_id"], name: "index_components_views_on_component_id", using: :btree
    t.index ["view_id"], name: "index_components_views_on_view_id", using: :btree
  end

  create_table "lines", force: :cascade do |t|
    t.string   "slug"
    t.string   "line_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_lines_on_slug", using: :btree
  end

  create_table "lines_sites", id: false, force: :cascade do |t|
    t.integer "line_id"
    t.integer "site_id"
    t.index ["line_id"], name: "index_lines_sites_on_line_id", using: :btree
    t.index ["site_id"], name: "index_lines_sites_on_site_id", using: :btree
  end

  create_table "links", force: :cascade do |t|
    t.string "href",   null: false
    t.string "anchor", null: false
  end

  create_table "links_sites", id: false, force: :cascade do |t|
    t.integer "link_id"
    t.integer "site_id"
    t.index ["link_id"], name: "index_links_sites_on_link_id", using: :btree
    t.index ["site_id"], name: "index_links_sites_on_site_id", using: :btree
  end

  create_table "sites", force: :cascade do |t|
    t.string   "slug"
    t.string   "site_type"
    t.json     "site_options"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["slug"], name: "index_sites_on_slug", using: :btree
  end

  create_table "video_clips", force: :cascade do |t|
    t.string   "slug"
    t.integer  "order"
    t.time     "start"
    t.time     "end"
    t.integer  "component_id"
    t.integer  "video_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["component_id"], name: "index_video_clips_on_component_id", using: :btree
    t.index ["slug"], name: "index_video_clips_on_slug", using: :btree
    t.index ["video_id"], name: "index_video_clips_on_video_id", using: :btree
  end

  create_table "videos", force: :cascade do |t|
    t.string   "url"
    t.string   "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "views", force: :cascade do |t|
    t.string   "view_type"
    t.json     "view_options"
    t.integer  "line_id"
    t.string   "slug"
    t.string   "title"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["line_id"], name: "index_views_on_line_id", using: :btree
    t.index ["slug"], name: "index_views_on_slug", using: :btree
  end

end
